import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../apicall.service'
import { Router,ActivatedRoute } from '@angular/router';
import { computeStyle } from '@angular/animations/browser/src/util';
import { Current } from '../../Common';
import { Options, ImageResult } from "ngx-image2dataurl";
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  src: any = "assets/images/stdnt.png";
  options: Options = {
    resize: {
      // maxHeight: 206,
      // maxWidth: 308
    },
    allowedExtensions: ['JPG', 'PnG']
  };

  selected(imageResult: ImageResult) {
    if (imageResult.error) alert(imageResult.error);
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;

    this.image_location = imageResult.resized.dataURL
   
    this.imageUrl = imageResult.resized.dataURL;


  }

  constructor(private tData:ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['ItemId'] != "" && param['ItemId'] != undefined)
      {
        this.title = "Edit School"
        this.type = "EditSchool"
        this.getSchool(param['ItemId'])
      }
    })        
   }
   image_location:any;
   imageUrl: any;
   title="Item"
   type= "NewItem"
   current = new Current()
   categoryList = []
  myvar:any = {ItemId: null,
  ItemName:'',
  ItemMrp:0,
  HsnCode:'',
  Qty:'',
  Catagory:'',
  Active:null


}

  ngOnInit() {
    this.getPartyList()
  }

  getPartyList()
  {
    let queryData =['getCatagory']
    this.tData.Get("/total/getAppdata",["DropdownData="+JSON.stringify(queryData)]).subscribe(data=>{
      this.categoryList = data[0]['data']
    })
  }

  getSchool(ItemId)
  {
    let qry = "Select * from  item where ItemId = "+ItemId
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{

      this.myvar = data ['data'][0]
      
      this.src = this.myvar.item_image;  //ye kr le 
     
    })
  }



  ready(){
   
    if(this.type == "NewItem")
      {
        
        
    let rd = true
      if(rd){
        this.tData.modiy(this.myvar,this.myvar.ItemId).subscribe(res=>{
          if(res){
            
            if(this.imageUrl!=null){
              this.myvar.item_image ='http://'+this.tData.serIP+'/Client/sangalapp/'+res['data']+'.jpg';
              this.myvar.ItemId=res['data']
              this.tData.saveimg('sangalapp/'+res['data']+'.jpg', this.imageUrl).subscribe(res => {
            
              })
              let updateQry = this.current.generateUpdateQuery(
          [this.myvar],
          ["ItemId"],
          ["ItemId"],
          "",
          "item"
          )
         
          this.tData.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{})
            }
           
            alert("Saved Document");
            this.route.navigateByUrl('/forms/itemreport')
          }

        },(err)=>{
          console.log(err)
          alert("Error while updating Item detail")
        })
      }
    }else{
      {
        if(this.imageUrl!=null){
          this.myvar.item_image ='http://'+this.tData.serIP+'/Client/sangalapp/'+this.myvar.ItemId+'.jpg';
        
        }
        let updateQry = this.current.generateUpdateQuery(
          [this.myvar],
          ["ItemId"],
          ["ItemId"],
          "",
          "item"
          )
         
          this.tData.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
          
            this.tData.saveimg('sangalapp/'+this.myvar.ItemId+'.jpg', this.imageUrl).subscribe(res => {
            
            })

            alert("Item detail updated")
            this.route.navigateByUrl('/forms/itemreport')
          },(err)=>{
            console.log(err)
            alert("Error while updating Item detail")
          })
      }
    }
    }

}
