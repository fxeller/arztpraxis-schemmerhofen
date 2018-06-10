import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() {}

  getNodesByTagName(rootElement: Node, tagName: string): Node[] {
    var result: Node[] = [];
    var node;

    for (var i = 0; i < rootElement.childNodes.length; i++) {
      node = rootElement.childNodes[i];
      
      if (node.nodeType == Node.ELEMENT_NODE) {
        if (node.tagName.toUpperCase() == tagName.toUpperCase()) result.push(node);
        if (node.childNodes.length > 0) result = result.concat(this.getNodesByTagName(node, tagName))
      }
    }
    
    return result;
  }

  getFolderNameByContentId(contentId: string): string {
    return 'assets/content/' + contentId + '/';
  }

  resolveStyles(document: Document) {
    var nodes = this.getNodesByTagName(document.head, 'style');
    var cssText: string = '';

    nodes.forEach(node => {cssText = cssText + node.textContent;});

    var styleNode = document.createElement("style");
    styleNode.textContent = cssText;
    document.body.appendChild(styleNode);
  }

  resolveImages(document: Document, contentId: string) {
    var nodes = this.getNodesByTagName(document.body, 'img');
      
    nodes.forEach(node => {
      var path = node.attributes.getNamedItem('src').value;
      var filename = path.replace(/^.*[\\\/]/, '');

      path = this.getFolderNameByContentId(contentId) + filename;

      node.attributes.getNamedItem('src').value = path;
    });
  }

  resolveContent(text: string, contentId: string): Promise<string> {
    const promise: Promise<string> = new Promise((resolve, reject) => {
      var parser = new DOMParser();
      var serializer = new XMLSerializer();
      var document = parser.parseFromString(text, "text/html");

      this.resolveStyles(document);
      this.resolveImages(document, contentId);

      resolve(serializer.serializeToString(document.body));
    })

    return promise;
  }

  getContentById(contentId: string): Promise<string> {
    return fetch(this.getFolderNameByContentId(contentId) + 'index.html')
    .then(response => response.text())
    .then(text => this.resolveContent(text, contentId));
  }
}
