import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cmp-a',
  templateUrl: './cmp-a.component.html',
  styleUrls: ['./cmp-a.component.css'],
})
export class CmpAComponent implements OnInit {
  items = ['a', 'b', 'c'];
  constructor() {}

  ngOnInit(): void {}
}
