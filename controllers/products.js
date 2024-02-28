const product=require('../models/product')

const getAllProducts=async(req,res)=>{

    const {company,name,featured,sort,select}=req.query;
    const queryObject={}
    if(company){
        queryObject.company=company;
    }
    if(featured){
        queryObject.featured=featured;
    }
    if(name){
        queryObject.name={$regex:name, $options:'i'};
    }
    let myData= product.find(queryObject)

    if(sort){
        let sortfix=sort.split(',').join(' ')
        myData=myData.sort(sortfix)
    }
    if(select){
        let selectfix=select.split(',').join(' ')
        myData=myData.select(selectfix)
    }

    //pagination.. by setting the limit and the no of pages

    let page=Number(req.query.page)||1;
    let limit=Number(req.query.limit)||4;

    let skip=(page-1)*limit;
    myData=myData.skip(skip).limit(limit)

    const apiData=await myData;
    res.status(200).json({apiData})
    
  
};
const getAllProductsTesting=async(req,res)=>{

    //select=name,company-------------------url
    //.select(name,company)
//   const myData= await product.find(req.query).sort('name price')
//   res.status(200).json({myData})
  const myData= await product.find(req.query).select('name price')
  res.status(200).json({myData})
};



module.exports={getAllProducts,getAllProductsTesting};