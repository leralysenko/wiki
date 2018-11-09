import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../services/project-manager.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  url: string = "";
  response: any;
  spouses: RegExp = /spouse = {{(.*?)}}/;
  children: RegExp = /children = {{(.*?)}}/;
  parents: RegExp = /parents = {{(.*?)}}/;
  regExpWithLink: RegExp = /\[\[(([A-Z]{1}[a-z]*\s*){2,})\]\]/;

  constructor(
    private projectManager: ProjectManagerService
  ) { }

  submitURL() {
    let wikiRegexp = /https:\/\/en.wikipedia.org\/wiki\/(.*)/;
    let match = wikiRegexp.exec(this.url);
    if (match) {
      console.log(match[1]);
      this.setName(String(match[1]));
      this.getUser();
    }
    
  }

  setName(value: string) {
    this.projectManager.name = value;
  }

  getUser() {
    this.projectManager.getUser().subscribe((json) => {
      console.log(json);
      this.response = json[0].revisions[0].content;

      this.getSpouse();
      this.getChildren();
      this.getParents();
    })
  }

  getSpouse() {
    let match = this.spouses.exec(this.response);
    // let matchWithLink = this.regExpWithLink.exec(String(match[1]));
    console.log(match);
    // console.log(matchWithLink);
  }

  getChildren() {
    let match = this.children.exec(this.response);
    console.log(match);
  }

  getParents() {
    let match = this.parents.exec(this.response);
    console.log(match);
  }

  ngOnInit() {
  }

}
