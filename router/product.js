    const router = require("express").Router();
    const path = require("path");
    const productScheme = require("./../schema/product");
router.route("/add").post(async (req,res)=> {
   
    const name = req.body.data.name;
    const productIMG =  req.body.data.productIMG;
    const description = req.body.data.description;
    const features = req.body.data.feature;
    const thumbimage = req.body.data.thumbimage;

    const nameGE = req.body.data.nameGE;
    const featuresGE = req.body.data.featureGE;
    const descriptionGE = req.body.data.descriptionGE;

    const nameRU = req.body.data.nameRU;
    const featuresRU = req.body.data.featureRU;
    const descriptionRU = req.body.data.descriptionRU;


    let thumbIMGURL = "";

    let base64Data = thumbimage.replace(/^data:image\/\\w+;base64,/,"");
    thumbIMGURL = `${name.replace(/\s/g,"").split("/").join("_") + "_main"}.${
        thumbimage.split("/")[1].split(";")[0]
    }`;

    require("fs").writeFile(
        `${__dirname}/${name.replace(/\s/g,"").split("/").join("_") + "_main"}.${
            thumbimage.split("/")[1].split(";")[0]
        }`,
        base64Data,
        "base64",
        function(err){
            console.log(err);
        }
    );
    console.log(req.body.type);

    let imgARR=[];
    productIMG.map((IMGURL,i)=> {
        let base64Data = IMGURL.replace(/^data:image\/\\w+;base64,/,"");
        imgARR.push({
            url: `${name.replace(/\s/g,"").split("/").join("_") + "_main"}.${
                thumbimage.split("/")[1].split(";")[0]
            }`,
        });
        require("fs").writeFile(
            `${__dirname}/${name.replace(/\s/g,"").split("/").join("_") + "_main"}.${
                thumbimage.split("/")[1].split(";")[0]
            }`,
            base64Data,
            "base64",
            function(err){
                console.log(err);
            }
        );
    });

    const arr = features.split(";");
    let newarr = [];
    arr.map((it)=>{
        newarr.push({
            prop: it.split(":")[0],
            value: it.split(":")[1]
        });
    });

    const arrRU = features.split(";");
    let newarrRU = [];
    arrRU.map((it)=>{
        newarrRU.push({
            prop: it.split(":")[0],
            value: it.split(":")[1]
        });
    });

    const arrGE = features.split(";");
    let newarrGE = [];
    arrGE.map((it)=>{
        newarrGE.push({
            prop: it.split(":")[0],
            value: it.split(":")[1]
        });
    });

    console.log(newarrGE, newarrRU, newarr);

    const obj ={
        name:name,
        description:description,
        properties:newarr,
        nameGE:nameGE,
        descriptionGE:descriptionGE,
        propertiesGE:newarrGE,
        nameRU:nameRU,
        descriptionRU:descriptionRU,
        propertiesRU:newarrRU,
        mainImage:thumbIMGURL,
        images : imgARR
    };

    let cond = 'productType';
    let value  = req.body.type;
    let querry = {}
    querry(cond) = value;

    productScheme.findOne(querry).then((re) => {
        if(re){
            re.products.push(obj)
        }else{
            const prodScheme = new productScheme({
                productType : req.body.type,
                products: obj
            }).save(); 
        }
    });

    res.json({success : true})
});

module.exports = router;

