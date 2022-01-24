

 "GET" http://localhost:3000/books 
return all books and details about it.

 "GET" http://localhost:3000/books/id 
return one special book and details about it.

 "POST" http://localhost:3000/books/
Add one special book.
You should add body, in which you will write all data about book, that you need

 "PUT" http://localhost:3000/books/id 
Update information about book.
You should add body, in which you will write all data about book, that you want to update.

 "Delete" http://localhost:3000/books/id 
Delete special book by Id
 Example
{
    "_id": 1,
    "title": "Unlocking Android",
    "pageCount": 416,
    "publishedDate": {
    "date": "2009-04-01T00:00:00.000-0700"
    },
    "thumbnailUrl":"https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "shortDescription": "Unlocking Android: A Developer's Guide ...",
    "longDescription": "Android is an open source mobile phone platform based os... ",
    "status": "PUBLISH",
    "authors": [
        "W. Frank Ableson",
        "Charlie Collins",
        "Robi Sen"
    ]
}
