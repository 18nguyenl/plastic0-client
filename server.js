const mysql = require('mysql');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "plastic0"
});

connection.connect();

app.get("/display", (req, res) => {
    let result = [];
    function q() {
        return new Promise( ( resolve, reject ) => {
            connection.query(
                `SELECT NameP, P_oz,s.SName,s.SLoc
                From product p, store s, station s1
                WHERE p.NameP=? AND p.StatID=s1.StatID AND s1.SID=s.SID`, 
                req.query.pname,
                function(error, results, fields) {
                    if (error) return reject(error);
                    resolve( results );
            });
        } )
    } 

    q().then( (r) => { 
        result = r
     } ). then( () => {
        res.json(result);
     }); 
});

app.get("/display/employee", (req, res) => {
    let result = [];
    function q() {
        return new Promise( ( resolve, reject ) => {
            connection.query(
                `SELECT Fname,Hours,Date
                FROM task_by_employee
                WHERE Fname=?`, 
                req.query.fname,
                function(error, results, fields) {
                    if (error) return reject(error);
                    resolve( results );
            });
        } )
    } 

    q().then( (r) => { 
        result = r
     } ). then( () => {
        res.json(result);
     }); 
});

app.get("/display/name", (req, res) => {
    let result = [];
    function q() {
        return new Promise( ( resolve, reject ) => {
            connection.query(
                `SELECT Fname, StatID
                FROM task_by_employee
                WHERE StatID=?`, 
                req.query.statid,
                function(error, results, fields) {
                    if (error) return reject(error);
                    resolve( results );
            });
        } )
    } 

    q().then( (r) => { 
        result = r
     } ). then( () => {
        res.json(result);
     }); 
});

app.post("/update", (req, res) => {
    let result;
    function q() {
        return new Promise( ( resolve, reject ) => {
            connection.query(
                `UPDATE product
                SET Oz_remain=?
                WHERE NameP=? AND StatID=?`, 
                [req.query.oztotal, req.query.pname, req.query.statid],
                function(error, results, fields) {
                    if (error) return reject(error);
                    resolve( results );
            });
        } )
    } 

    q().then( (r) => { 
        result = r
     } ). then( () => {
         res.json(result);
     }); 
})

app.post("/delete", (req, res) => {
    let result;
    function q() {
        return new Promise( ( resolve, reject ) => {
            connection.query(
                `DELETE FROM product
                WHERE NameP=? AND StatID=?`, 
                [req.query.pname, req.query.statid],
                function(error, results, fields) {
                    if (error) return reject(error);
                    resolve( results );
            });
        } )
    } 

    q().then( (r) => { 
        result = r
     } ). then( () => {
         res.json(result);
     }); 
})

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}`);
})