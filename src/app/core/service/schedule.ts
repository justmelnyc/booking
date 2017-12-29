import {Injectable} from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class ScheduleService {
	availableTimes = [9, 10, 12];

	private daySource = new BehaviorSubject<string>('monday');

  selectedDay$ = this.daySource.asObservable();

  private basePath = '/schedule';
 	times = null; //  list of objects
  time = null; //   single object

	constructor(private db: AngularFireDatabase) {  }
	 updateDay(day) {
		this.daySource.next(day);
		this.getDayTimes(day)
	}

	  getTimesList(query={}): FirebaseListObservable<any[]> {
	  this.times = this.db.list(this.basePath, {
	    query: query
	  });
	  return this.times;
	}

	  getDayTimes(day: string): FirebaseListObservable<any[]> {
	  const dayPath =  `${this.basePath}/${day}`;
		this.times = this.db.list(dayPath);
		console.log('set day ran and getsettimes too')
	  return this.times;
	}

		// blockTime(time: number): void {
		// 	const idx = _.indexOf(this.times, time);
		// 	if (idx !== -1) {
		// 			this.times.splice(idx, 1);
		// 	} else {
		// 			this.times.push(time);
		// 	}
		// }

		// arr = [4, 5, 8];

 blockTime(time: number) {
    const idx = _.indexOf(this.times, time);
    if (idx >= 0) {
      this.times.splice(idx, 1);
    } else {
      this.times.push(time);
    }
  }


	// Return a single observable item
	getTime(key: string): FirebaseObjectObservable<any> {
	  const itemPath =  `${this.basePath}/${key}`;
	  this.time = this.db.object(itemPath)
	  return this.time
	}

	createItem(time: any): void  {
   		this.times.push(time)
     .catch(error => this.handleError(error))
	 }
	 // Update an existing item
	 updateItem(key: string, value: any): void {
	   this.times.update(key, value)
	     .catch(error => this.handleError(error))
	 }
	 // Deletes a single item
	 deleteItem(key: string): void {
	     this.times.remove(key)
	       .catch(error => this.handleError(error))
	 }
	 // Deletes the entire list of times
	 deleteAll(): void {
	     this.times.remove()
	       .catch(error => this.handleError(error))
	 }
	 // Default error handling for all actions
	 private handleError(error) {
	   console.log(error)
	 }
}
