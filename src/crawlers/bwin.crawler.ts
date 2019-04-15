import {URL} from 'url';
import {mkdirSync, existsSync} from 'fs';
import * as puppeteer from 'puppeteer';

export class BwinCrawler {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
 
  crawl(site: any) {
    (async () => {
      // Wait for browser launching.
     const browser = await puppeteer.launch({devtools:true,headless:false,executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'});
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

    await clientCDP.send('Network.setRequestInterception',{ patterns: [
      { 
        urlPattern: '*', 
        resourceType: 'Script', 
        interceptionStage: 'HeadersReceived' 
      }
    ]});


    /**
     * 
     * 
     */
    clientCDP.on('Network.requestIntercepted', async ({ interceptionId, request, responseHeaders, resourceType }) => {
      console.log(`Intercepted ${request.url} {interception id: ${interceptionId}}`);
  
      const response = await clientCDP.send('Network.getResponseBodyForInterception',{ interceptionId });
  
     
  
      console.log(`Continuing interception ${interceptionId}`)
      clientCDP.send('Network.continueInterceptedRequest', {
        interceptionId,
        rawResponse: response.body
      });
    });

   //https://medium.com/@jsoverson/using-chrome-devtools-protocol-with-puppeteer-737a1300bac0


    // Create a directory storing the result PDFs.
    if (!existsSync(dirname)) {
      mkdirSync(dirname);
    }

    // Go to the target page.
    let url = new URL(path);
    await page.goto(path, {waitUntil: 'networkidle2'});
    debugger;
    // Take a snapshot in PDF format.
    /*await page.pdf({path: 
      `${dirname}/${url.pathname.slice(1).replace('/', '-')}.pdf`, format: 'A4'});*/
    if (selectors.length == 0) {
      return;
    }
  


    let a=await page.evaluate(()=> {
      debugger;
      let a=document.querySelectorAll('#scoreboard > div.content > div > lbk-scoreboard-details > div > div > div > table > tbody > tr > td:nth-child(2) > span > span.counter-number.divider');
      let b=null;
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

new BwinCrawler('https://livebetting.bwin.es/es/live?trid=in10937#/8422464').crawl({name:'bwin',children:['#scoreboard > div.content > div > lbk-scoreboard-details > div > div > div > table > tbody > tr > td:nth-child(2) > span > span.counter-number.divider']})