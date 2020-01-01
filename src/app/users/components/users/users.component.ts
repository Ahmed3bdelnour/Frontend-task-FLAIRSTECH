import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { RestService } from '../../services/rest.service';

import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { Address } from '../../models/address.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  //columns to be displayed in angular material data table 
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'address'];

  // users array to be displayed
  users: User[] = [];

  //datasource object to be passed to data table
  dataSource = new MatTableDataSource<User>([]);

  //selection model to handle selection on the table
  selection = new SelectionModel<User>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild('table', { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //getting users from users resolvers and initialize datasource
    this.users = this.activatedRoute.snapshot.data['users'];
    this.dataSource = new MatTableDataSource<User>(this.users);
  }


  
  /**
   * open add user modal
   * @return {void}
   * @author Ahmed Abdelnour
   */
  OpenAddUserModal() {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '80%',
      position: { top: '30px' },
      hasBackdrop: true,
      panelClass: 'user-popup'
    });

    //subscribing to close event of the modal
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(userFromResult => {
        if (userFromResult) {
          let user: User = {
            id: userFromResult.id,
            name: userFromResult.name,
            email: userFromResult.email,
            phone: userFromResult.phone,
            address: new Address(userFromResult.address.street, userFromResult.address.suite, userFromResult.address.city)
          }
          this.users.unshift(user);
          this.dataSource = new MatTableDataSource<User>(this.users);
        }

      })
    );
  }


  /**
   * Whether the number of selected elements matches the total number of rows
   * @return {boolean}
   * @author Ahmed Abdelnour
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection
   * @return {void}
   * @author Ahmed Abdelnour
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * The label for the checkbox on the passed row
   * @param {User} row => row at datatable
   * @return {string}
   * @author Ahmed Abdelnour
   */
  checkboxLabel(row?: User): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

   /**
   * navigate to user details when on clicking any row
   * @param {User} user => user to be displayed at details page
   * @return {void}
   * @author Ahmed Abdelnour
   */
  navigateToUserInfo(user) {
    this.router.navigate(['/user', user.id]);
  }

// clear subscriptions on detsroy
  ngOnDestroy() {
    this.subscriptions.map(
      subscription => subscription.unsubscribe()
    );
  }

}
