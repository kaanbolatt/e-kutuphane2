import { Component, Input, OnInit } from '@angular/core';
import { UmkeService } from 'src/app/umke/services/umke.service';
import { InstitutionType } from '../../enums/institution-type.enum';
import { Process } from '../../enums/process.enum';

@Component({
  selector: 'app-comment-bubble',
  templateUrl: './comment-bubble.component.html',
  styleUrls: ['./comment-bubble.component.scss']
})
export class CommentBubbleComponent implements OnInit {
  @Input() item: any;
  @Input() order: any;
  @Input() file: any;

  nameCapital: string;
  surnameCapital: string;

  constructor(
    private umkeService: UmkeService
  ) { }

  ngOnInit(): void {

    const surnameTemp = this.item.createdUserFullName.split(" ");
    this.nameCapital = surnameTemp[0][0];
    this.surnameCapital = surnameTemp[surnameTemp.length - 1][0];
  }
  processType(i: number) {
    return Process[i]
  }
  institutionType(id: number) {
    return InstitutionType[id]

  }
  takeAttachment(content: string, fileName: string, format: string) {
    debugger
    this.umkeService.downloadTicketFile(content, fileName, format)
  }
}
