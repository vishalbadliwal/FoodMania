import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  public errorCode: any;
  public errMsg: any;
  public codeResponse:any;
  public errCodes: any = ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '421', '422', '426', '428', '429', '431','440', '500', '501', '502', '503', '504', '505', '506', '507', '508', '510', '511']

  constructor(private _route: ActivatedRoute, private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
     this.codeResponse=this._route.snapshot.paramMap.get('code')
    if (this.errCodes.includes(this.codeResponse)) {
      this.errorCode = this.codeResponse;
    }

    else {
      this.errMsg = "Error Occured";
    }
  }

}
