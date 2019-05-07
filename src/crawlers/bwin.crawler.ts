import { URL } from 'url';
import { mkdirSync, existsSync } from 'fs';
import * as puppeteer from 'puppeteer';



// Los cambios los voy a detectar con MutationObserver
// https://stackoverflow.com/questions/47378194/fire-a-function-when-innerhtml-of-element-changes
export class BwinCrawler {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  crawl(site: any) {
    (async () => {
      // Wait for browser launching.
      const browser = await puppeteer.launch({
        devtools: true,
        headless: false,
        args: [
          '--disable-extensions-except=C:\\Users\\Gabi\\eclipse2-workspace\\chrome_extension'
        ],
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      });
      // Wait for creating the new page.
      const page = await browser.newPage();



      await this.crawlInternal(page, `${this.baseUrl}`, site['children'], site['name']);

      browser.close();
    })();
  }

  /**
   * Crawling the site recursively
   * selectors is a list of selectors of child pages.
   */
  async crawlInternal(page: any, path: string, selectors: string[], dirname: string) {

    //cient ChrmeDevtoolsProtocol
    const clientCDP = await page.target().createCDPSession();

    await clientCDP.send('Network.enable');

    await clientCDP.send('Network.setRequestInterception', {
      patterns: [
        {
          urlPattern: '*',
          resourceType: 'Script',
          interceptionStage: 'HeadersReceived'
        }
      ]
    });


    /**
     * 
     * 
     */
    clientCDP.on('Network.requestIntercepted', async ({ interceptionId, request, responseHeaders, resourceType }) => {
      console.log(`Intercepted ${request.url} {interception id: ${interceptionId}}`);

      const response = await clientCDP.send('Network.getResponseBodyForInterception', { interceptionId });



      console.log(`Continuing interception ${interceptionId}`)
      clientCDP.send('Network.continueInterceptedRequest', {
        interceptionId,
        rawResponse: response.body
      });
    });

    // https://stackoverflow.com/questions/48375700/how-to-use-puppeteer-to-dump-websocket-data
    /*
      clientCDP.on('Network.webSocketCreated', ({requestId, url}) => {
        console.log('Network.webSocketCreated', requestId, url)
      })
    
      clientCDP.on('Network.webSocketClosed', ({requestId, timestamp}) => {
        console.log('Network.webSocketClosed', requestId, timestamp)
      })
    
      clientCDP.on('Network.webSocketFrameSent', ({requestId, timestamp, response}) => {
        console.log('Network.webSocketFrameSent', requestId, timestamp, response.payloadData)
      })
      clientCDP.on('Network.webSocketFrameReceived', ({requestId, timestamp, response}) => {
        console.log('Network.webSocketFrameReceived', requestId, timestamp, response.payloadData)
      })
  */
    //https://medium.com/@jsoverson/using-chrome-devtools-protocol-with-puppeteer-737a1300bac0


    // Escucho algunos consoles que lanzo yo en el mutation observer
    page.on('console', async (msg) => {
      if (msg._text.indexOf('mutObs:')==0) {
        console.log(msg._text);
      }
    })

    // Create a directory storing the result PDFs.
    if (!existsSync(dirname)) {
      mkdirSync(dirname);
    }

    // Go to the target page.
    let url = new URL(path);
    await page.goto(path, { waitUntil: 'networkidle2' });

    debugger;
    // Take a snapshot in PDF format.
    /*await page.pdf({path: 
      `${dirname}/${url.pathname.slice(1).replace('/', '-')}.pdf`, format: 'A4'});*/
    if (selectors.length == 0) {
      return;
    }


    // #imsg-cont
    let a = await page.evaluate(() => {
   
      let a = document.querySelectorAll('#scoreboard > div.content > div > lbk-scoreboard-details > div > div > div > table > tbody > tr > td:nth-child(2) > span > span.counter-number.divider');
      let b = null;


      // Pongo un mutation observer observando el elemento que tiene la cuota y logueo cada vez que cambia para que lo obtenga puppeteer 

      const observer = new MutationObserver(function (mutations) {
        debugger;
        mutations.forEach(function (mutation) {
          console.log('mutObs:'+mutation.target['innerHTML']);
        });
      });
      const config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      }
      observer.observe(a[0], config);
      //})





      return a[0].innerHTML;
    })



    debugger;
    console.log(a);
    // Traversing in an order of BFS.
    let items: string[] = await page.evaluate((sel) => {
      let ret = [];
      for (let item of document.querySelectorAll(sel)) {
        console.log(item);
        let href = item.getAttribute('href');
        ret.push(href);
      }
      return ret;
    }, selectors[0]);

    for (let item of items) {
      console.log(`Capturing ${item}`);
      await this.crawlInternal(page,
        `${item}`, selectors[0]['children'], `${dirname}/${selectors[0]['name']}`)
    }
  }
}

new BwinCrawler('https://livebetting.bwin.es/es/live?trid=in10937#/8422464').crawl({ name: 'bwin', children: ['#scoreboard > div.content > div > lbk-scoreboard-details > div > div > div > table > tbody > tr > td:nth-child(2) > span > span.counter-number.divider'] })