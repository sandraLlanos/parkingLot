import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from './vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  protected URL = 'http://fakerestapi.azurewebsites.net/api/Users';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  // public findById(id: any): Observable<User> {
  //   return this.http.get<User>(this.URL + '/' + id);
  // }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  // public findAll(params?): Observable<User[]> {
  //   return this.http.get<User[]>(this.URL, {params});
  // }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<Vehicle> {
    return this.http.delete<Vehicle>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: Vehicle): Observable<Vehicle> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Vehicle>(this.URL, data, {headers});
  }

  /**
   * Update specific object into DB
   * @param game the object to be updated
   * @returns gets the response
   */
  // public update(user: User): Observable<User> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json; charset=utf-8');

  //   return this.http.put<User>(this.URL + '/' + user.ID, user, {headers});
  // }
}
