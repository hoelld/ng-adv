import { Component, OnInit } from '@angular/core';
import { Skill } from '../model/skill.model';
import { SkillsFacadeService } from '../store/skills-facade.service';

@Component({
  selector: 'app-skills-list-with-row',
  templateUrl: './skills-list-with-row.component.html',
  styleUrls: ['./skills-list-with-row.component.scss'],
})
export class SkillsListWithRowComponent implements OnInit {
  constructor(private sf: SkillsFacadeService) {}

  skills$ = this.sf.getSkills()
  sk:Skill[]=[]
  
  ngOnInit(): void {
    this.sf.initSkills();
    this.sf.getSkills().subscribe(
      el=>{
        console.log('el ',el)
      }
    )
  }

  addItem(): void {
    const newItem: Skill = { id: 0, name: 'New Skill', completed: false };
    this.sf.addSkill(newItem);
  }

  deleteItem(item: Skill): void {
    //this.sf.deleteSkill(item);
  }

  toggleItemComplete(item: Skill): void {
    //this.sf.toggleComplete(item);
  }
}