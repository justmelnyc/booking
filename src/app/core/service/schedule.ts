import {Injectable} from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class ScheduleService {
	availableTimes = [9, 10, 12];
	newTimes;

	private daySource = new BehaviorSubject<string>('monday');

  selectedDay$ = this.daySource.asObservable();
  private timePath = '/times/monday';

  private basePath = '/schedule';
 	times = null; //  list of objects
  time = null; //   single object

	constructor(private db: AngularFireDatabase) {
		this.times = this.db.object(this.basePath);
	 }
	 updateDay(day) {
		this.daySource.next(day);
		this.getDayTimes(day)
	}

	  getTimesList(query={}): FirebaseListObservable<any[]> {
	  this.times = this.db.list(this.basePath);
	  return this.times;
	}
		getTimesList2(query={}): FirebaseObjectObservable<any[]> {
	  this.newTimes = this.db.object(this.timePath);
	  return this.newTimes;
	}


	  getDayTimes(day: string): FirebaseListObservable<any[]> {
	  const dayPath =  `${this.basePath}/${day}`;
		this.times = this.db.list(dayPath);
		console.log('set day ran and getsettimes too')
	  return this.times;
	}

// 	block(event, day) {

// 		// const {$key, $value} = event;
// 		const key = event.$key;
// 		delete event.$key;

// 		const dayPath =  `${this.basePath}/${day}`;
// 		// console.log($key, $value, day);
// 		this.times.update(key, event );
//  }

 block(event: any, day): void {
	 const key = event.$key.toString();
	 const keyN = event.$key;
	 delete event.$key;

	 const dayPath =  `${this.basePath}/${day}`;
	//  console.log(key, day, keyN)
   this.db.object(dayPath)
    .update({  key : true });
}

	// Return a single observable item
	getTime(key: string): FirebaseObjectObservable<any> {
	  const itemPath =  `${this.basePath}/${key}`;
	  this.time = this.db.object(itemPath)
	  return this.time;
	}

	createItem(time: any): void  {
   		this.times.push(time)
     .catch(error => this.handleError(error))
	 }
	 // Update an existing item
	 updateItem(event): void {
	   this.times.update(event.key, event.value)
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
