/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  let books = []

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      let bookList = books.map(book => {
        return {
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        }
      })
      res.json(bookList)
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title){
        res.send('missing required field title')
      } else {
        let newBook = {
          title: title,
          _id: books.length + 1,
          comments: []
        }
        books.push(newBook)
        res.json(newBook)
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      books = []
      res.send('complete delete successful')
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let book = books.find(book => book._id == bookid)
      if (!book) {
        res.send('no book exists')
      }
      res.json(book)
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment) {
        res.send('missing required field comment')
      }
      let book = books.find(book => book._id == bookid)
      if (!book) {
        res.send('no book exists')
      }
      book.comments.push(comment)
      res.json(book)
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      let book = books.find(book => book._id == bookid)
      if (!book) {
        res.send('no book exists')
      }
      books = books.filter(book => book._id != bookid)
      res.send('delete successful')
    });
  
};
