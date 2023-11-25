import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-binding-history-item',
    templateUrl: './bidding-history-item.component.html',
    styleUrls: ['./bidding-history-item.component.css']
})
export class BidingHistoryItem {
    @Input() imageUrl: string = '';
    @Input() name: string = '';
    @Input() price: string = '';
    @Input() time: string = '';
}
