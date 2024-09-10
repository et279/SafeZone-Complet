// Imporatmos los modelos
const Site = require('../models/Site');
const SiteType = require('../models/SiteType');
const siteCategory = require('../models/SiteCategory');
const restriction = require ('../models/Restricition');

//Retrieves all sites from the database. 
exports.getAllSites = async (req, res) => {
    try {
      const sites = await Site.find(); // Encuentra todos los sitios
      res.status(200).json(sites); // Devuelve los sitios en formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los sitios', error });
    }
};

//Retrieves all active sites from the database.
exports.getAllSiteActive = async (req, res) => {
  try {
    const sites = await Site.aggregate(
      [
        { $match: {isActive: true }},
        {
          $lookup: {
            from: "sitetypes", // Nombre de la colección a la que se va a unir
            localField: "siteTypeId", // Campo en la colección de "sitios"
            foreignField: "_id", // Campo en la colección de "siteTypes"
            as: "siteTypeInfo" // Nombre del campo en el resultado que contendrá los datos unidos
          }
        },
        {
          $unwind: "$siteTypeInfo" // Desenrolla el array para que sea un solo documento
        },
        {
          $project: { // Proyectar los campos necesarios
            _id: 0, // Excluir el campo _id
            name: 1,
            coordinates: 1,
            coordinatesrestriction: 1, // Incluir directamente el campo de coordinatesRestriction
            "siteTypeId": "$siteTypeInfo.name", // Obtener el name de siteTypeInfo
          }
        }

      ]
    ); // Encuentra todos los sitios que cumplen con los parametros
    res.status(200).json(sites); // Devuelve los sitios en formato JSON
  } catch (error) {    
    console.error(error); // Notificacion de error en consola
    res.status(500).json({ message: 'Error al obtener los sitios activos', error });
  }
};
//Retrieves all inactive sites from the database.
exports.getAllSiteInactive = async (req, res) => {
  try {
    const sites = await Site.aggregate(
      [
        { $match: {isActive: false }},
        {
          $lookup: {
            from: "siteTypes", // Nombre de la colección a la que se va a unir
            localField: "siteTypeId", // Campo en la colección de "sitios"
            foreignField: "_id", // Campo en la colección de "siteTypes"
            as: "siteTypeInfo" // Nombre del campo en el resultado que contendrá los datos unidos
          }
        },
        {
          $unwind: "$siteTypeInfo" // Desenrolla el array para que sea un solo documento
        },
        {
          $project: { // Proyectar los campos necesarios
            _id: 0, // Excluir el campo _id
            name: 1,
            coordinates: 1,
            "siteTypeId": "$siteTypeInfo.name", // Obtener el name de siteTypeInfo
            coordinatesRestriction: 1 // Incluir directamente el campo de coordinatesRestriction
          }
        }

      ]
    ); // Encuentra todos los sitios que cumplen con los parametros
    res.status(200).json(sites); // Devuelve los sitios en formato JSON
  } catch (error) {    
    console.error(error); // Notificacion de error en consola
    res.status(500).json({ message: 'Error al obtener los sitios activos', error });
  }
};

//Retrieves all active sites from the database with data from table.
exports.getAllSiteActiveFull = async (req, res) => {
  try {
    const sites = await Site.aggregate(
      [
        { $match: {isActive: true }},
        {
          $lookup: {
            from: "sitetypes", // Nombre de la colección a la que se va a unir
            localField: "siteTypeId", // Campo en la colección de "sitios"
            foreignField: "_id", // Campo en la colección de "siteTypes"
            as: "siteType" // Nombre del campo en el resultado que contendrá los datos unidos
          }
        },
        {
          $unwind: {
            path: "$siteType", // Desenrolla el array para que sea un solo documento
            preserveNullAndEmptyArrays: true // Mantiene el sitio incluso si no hay tipo asociado
          }
        },
        // Realiza el join con la colección SiteCategory
        {
          $lookup: {
            from: 'sitecategories', // Nombre de la colección SiteCategory
            localField: 'siteType.categoryId', // Campo en SiteType que contiene el ID de SiteCategory
            foreignField: '_id', // Campo en SiteCategory que coincide con localField
            as: 'category'
          }
        },

        // Despliega el primer elemento del array category
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true // Mantiene el tipo incluso si no hay categoría asociada
          }
        },
        // Realiza el join con la colección SiteCategory
        {
          $lookup: {
            from: 'restrictions', // Nombre de la colección restrictions
            localField: 'restrictionId', // Campo en SiteType que contiene el ID de restrictions
            foreignField: '_id', // Campo en la colección de "restrictions"
            as: 'restrictions'
          }
        },
        // Despliega el primer elemento del array category
        {
          $unwind: {
            path: '$restrictions',
            preserveNullAndEmptyArrays: true // Mantiene el tipo incluso si no hay categoría asociada
          }
        },
        {
          $project: { // Proyectar los campos necesarios
            _id: 0, // Excluir el campo _id
            name: 1,
            'siteType.name': 1, // Nombre del tipo de sitio
            'category.name': 1, // Nombre de la categoría
            updateAt: 1,
            'restrictions.radius': 1, // Nombre de la categoría

          }
        }

      ]
    ); // Encuentra todos los sitios que cumplen con los parametros
    res.status(200).json(sites); // Devuelve los sitios en formato JSON
  } catch (error) {    
    console.error(error); // Notificacion de error en consola
    res.status(500).json({ message: 'Error al obtener los sitios activos', error });
  }
};
//Retrieves all inactive sites from the database with data from table.
exports.getAllSiteInctiveFull = async (req, res) => {
  try {
    const sites = await Site.aggregate(
      [
        { $match: {isActive: false }},
        {
          $lookup: {
            from: "sitetypes", // Nombre de la colección a la que se va a unir
            localField: "siteTypeId", // Campo en la colección de "sitios"
            foreignField: "_id", // Campo en la colección de "siteTypes"
            as: "siteType" // Nombre del campo en el resultado que contendrá los datos unidos
          }
        },
        {
          $unwind: {
            path: "$siteType", // Desenrolla el array para que sea un solo documento
            preserveNullAndEmptyArrays: true // Mantiene el sitio incluso si no hay tipo asociado
          }
        },
        // Realiza el join con la colección SiteCategory
        {
          $lookup: {
            from: 'sitecategories', // Nombre de la colección SiteCategory
            localField: 'siteType.categoryId', // Campo en SiteType que contiene el ID de SiteCategory
            foreignField: '_id', // Campo en SiteCategory que coincide con localField
            as: 'category'
          }
        },

        // Despliega el primer elemento del array category
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true // Mantiene el tipo incluso si no hay categoría asociada
          }
        },
        // Realiza el join con la colección SiteCategory
        {
          $lookup: {
            from: 'restrictions', // Nombre de la colección restrictions
            localField: 'restrictionId', // Campo en SiteType que contiene el ID de restrictions
            foreignField: '_id', // Campo en la colección de "restrictions"
            as: 'restrictions'
          }
        },
        // Despliega el primer elemento del array category
        {
          $unwind: {
            path: '$restrictions',
            preserveNullAndEmptyArrays: true // Mantiene el tipo incluso si no hay categoría asociada
          }
        },
        {
          $project: { // Proyectar los campos necesarios
            _id: 0, // Excluir el campo _id
            name: 1,
            'siteType.name': 1, // Nombre del tipo de sitio
            'category.name': 1, // Nombre de la categoría
            updateAt: 1,
            'restrictions.radius': 1, // Nombre de la categoría

          }
        }

      ]
    ); // Encuentra todos los sitios que cumplen con los parametros
    res.status(200).json(sites); // Devuelve los sitios en formato JSON
  } catch (error) {    
    console.error(error); // Notificacion de error en consola
    res.status(500).json({ message: 'Error al obtener los sitios activos', error });
  }
};  
  