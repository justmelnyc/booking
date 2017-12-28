import {Injectable} from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ScheduleService {

  private basePath: string = '/schedule';
 	times: FirebaseListObservable<any[]> = null; //  list of objects
  	time: FirebaseObjectObservable<any> = null; //   single object


  constructor(private db: AngularFireDatabase) {  }
	  getTimesList(query={}): FirebaseListObservable<any[]> {
	  this.times = this.db.list(this.basePath, {
	    query: query
	  });
	  return this.times
	}


	  getDayTimes(day: string): FirebaseListObservable<any[]> {
	  const dayPath =  `${this.basePath}/${day}`;
	  this.times = this.db.list(dayPath);
	  return this.times
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
