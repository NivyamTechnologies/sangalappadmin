import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../apicall.service'
import { Router,ActivatedRoute } from '@angular/router';
import { computeStyle } from '@angular/animations/browser/src/util';
import { Current } from '../../Common';
import { Options, ImageResult } from "ngx-image2dataurl";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  src: any = "assets/images/stdnt.png";
  options: Options = {
    resize: {
      maxHeight: 128,
      maxWidth: 128
    },
    allowedExtensions: ['JPG', 'PnG']
  };

  selected(imageResult: ImageResult) {
    if (imageResult.error) alert(imageResult.error);
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    console.log(imageResult.resized.dataURL)
    this.image_location = imageResult.resized.dataURL
    console.log(imageResult.resized.dataURL)
    this.imageUrl = imageResult.resized.dataURL;
    console.log(this.imageUrl)

  }

  constructor(private api : ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['categoryId'] != "" && param['categoryId'] != undefined)
      {
        this.title = "Edit categoryId"
        this.type = "EditcategoryId"
        this.getSchool(param['categoryId'])
      }
    })
   }

  ngOnInit() {
  }
  image_location:any;
  imageUrl: any;
  title="category"
  type= "Newcategory"
  current = new Current()
  model = {
    "categoryId" : '',
    "categoryName" : '',
    "Active" : 'Y',
    "image" : ''

  }

  getSchool(categoryId)
  {
    let qry = "Select * from category where categoryId = "+categoryId
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
      this.model = data ['data'][0]
      this.src = this.model.image;
    })
  }

  ready()
  {
    if(this.isValid())
    {
     
      if(this.type == "Newcategory")
      {
       
        this.api.saveMasterDefinition("category",{category : [this.model]}).subscribe(res=>{
          if(this.imageUrl!=null){
            this.model.image ='http://'+this.api.serIP+'/Client/sangalapp/category/'+res+'.jpg';
            this.model.categoryId =res.toString();
          
            let updateQry = this.current.generateUpdateQuery(
              [this.model],
              ["categoryId"],
              ["categoryId"],
              "",
              "category"
              )
            
              this.api.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
         
          this.api.saveimg('sangalapp/category/'+res+'.jpg', this.imageUrl).subscribe(res => {
            
          })
        })
        }
          alert("category saved")
          this.route.navigateByUrl('/forms/categorybrowser')
        },err=>{
          alert("Error while saving category")
        })
      }
      else
      {
        if(this.imageUrl!=null){
          this.model.image =this.api.serIP+'/Client/sangalapp/category/'+this.model.categoryId+'.jpg';
        
        }
        let updateQry = this.current.generateUpdateQuery(
          [this.model],
          ["categoryId"],
          ["categoryId"],
          "",
          "category"
          )
        
          this.api.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
            alert("category  updated")
            this.api.saveimg('sangalapp/category/'+this.model.categoryId+'.jpg', this.imageUrl).subscribe(res => {
            
            })
            this.route.navigateByUrl('/forms/categorybrowser')
          },(err)=>{
            console.log(err)
            alert("Error while updating category detail")
          })
      }
    }

  }

  isValid()
  {
   
    let valid = true
    let message = ""
    if(this.model['categoryName'] == "")
    {
      message += "category Name can't be empty\n"
      valid = false
    }
    

    if(!valid)
    {
      alert(message)
    }

    return valid
  }
}
