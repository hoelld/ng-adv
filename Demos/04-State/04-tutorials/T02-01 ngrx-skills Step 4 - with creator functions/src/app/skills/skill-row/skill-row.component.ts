import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '../model/skill.model';

@Component({
  selector: 'app-skill-row',
  templateUrl: './skill-row.component.html',
  styleUrls: ['./skill-row.component.scss'],
})
export class SkillRowComponent implements OnInit {
  @Input() skill: Skill = null as unknown as Skill; // typescript strict nonsense
  @Output() itemDeleted: EventEmitter<Skill> = new EventEmitter();
  @Output() itemCompleted: EventEmitter<Skill> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteItem(item: Skill): void {
    this.itemDeleted.emit(item);
  }

  toggleItemCompleted(item: Skill): void {
    this.itemCompleted.emit(item);
  }
}