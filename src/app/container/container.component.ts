import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../services/project-manager.service';
import getRelativeNames, {hasLink} from  'wiki_relatives_parser'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  url: string = "";
  response: any;
  content: any;

  spouses: any = [];
  children: any = [];
  parents: any = [];

  isSpouses = false;
  isChildren = false;
  isParents = false;

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
    this.clearForm();
    this.projectManager.name = value;
  }

  getUser() {
    this.projectManager.getUser().subscribe((json) => {
      // console.log(json);
      this.content = json[0].revisions[0].content;
      this.response = getRelativeNames(this.content, ['children', 'parents', 'spouse']);
      console.log(this.response);
      this.getSpouse();
      this.getChildren();
      this.getParents();
      // if (this.response && this.response.spouse) {this.isSpouses = true; this.spouses = this.response.spouse;}
      // if (this.response && this.response.children) {this.isChildren = true; this.children = this.response.children;}
      // if (this.response && this.response.parents) {this.isParents = true; this.parents = this.response.parents;}
    })
  }

  clearForm() {
    this.spouses = [];
    this.children = [];
    this.parents = [];

    this.isSpouses = false;
    this.isChildren = false;
    this.isParents = false;
  }

  getSpouse() {
    if (this.response && this.response.spouse) {
      this.isSpouses = true; 
      this.response.spouse.forEach(element => {
        this.spouses.push({
          data: element,
          link: hasLink(this.content, element)
        })
      });
    }
  }

  getChildren() {
    if (this.response && this.response.children) {
      this.isChildren = true; 
      this.response.children.forEach(element => {
        this.children.push({
          data: element,
          link: hasLink(this.content, element)
        })
      });
    }
  }

  getParents() {
    if (this.response && this.response.parents) {
      this.isParents = true; 
      this.response.parents.forEach(element => {
        this.parents.push({
          data: element,
          link: hasLink(this.content, element)
        })
      });
    }
  }

  ngOnInit() {
  }

}
