const Category = require('../models/category');

let createLevel1 = async (req, res, next) => {
    let title = req.body.title;
    if(title === undefined) return res.status(400).send('Trường title không tồn tại');
    let category = await Category.findOne({ where: { title } });
    if(category) return res.status(409).send('Tên danh mục đã tồn tại');
    else {
        let newCategory = await Category.create({ title });
        return res.send(newCategory);
    }
}

let createLevel2 = async (req, res, next) => {
    let title = req.body.title;
    if(title === undefined) return res.status(400).send('Trường title không tồn tại');
    let parent_id = req.body.parent_id;
    if(parent_id === undefined) return res.status(400).send('Trường parent_id không tồn tại');
    let parentCategory = await Category.findOne({ where: { category_id: parent_id } });
    if(!parentCategory) return res.status(400).send('parent_id đã nhập không tồn tại');
    let category = await Category.findOne({ where: { title: title, level: 2 } });
    if(category) return res.status(409).send('Tên danh mục đã tồn tại');
    else {
        let newCategory = await Category.create({ title, level: 2, parent_id });
        return res.send(newCategory);
    }
}

let listAll = async (req, res, next) => {
    let listCategoryLevel1 = await Category.findAll({ 
        where: { parent_id: null }, 
        attributes: ['category_id', 'title'], 
        raw: true 
    });
    
    let listCategory = [];
    for( let { category_id, title } of listCategoryLevel1 ) {
        let listCategoryLevel2 = await Category.findAll({ 
            where: { parent_id: category_id }, 
            attributes: ['category_id', 'title'], 
            raw: true 
        });
        let category = { category_id, title, children: listCategoryLevel2 };
        listCategory.push(category);
    }
    
    res.send(listCategory);
}

let listLevel1 = async (req, res, next) => {
    let categories = await Category.findAll({ 
        where: { parent_id: null }, 
        attributes: ['category_id', 'title'], 
        raw: true 
    });
    return res.send(categories);
}

module.exports = {
    createLevel1,
    createLevel2,
    listAll,
    listLevel1
};
