If nodejs and NPM are installed: To run the project locally click on the batch file "run.bat"
It will take a few moments to start

Some Test Cases for the API when running the local file
http://localhost:5000/report/?dims=country&fields=name,goal
http://localhost:5000/report/?dims=category&fields=name,goal,budget
http://localhost:5000/report/?dims=goal&fields=name,goal,budget

The project is also deployed and live on heroku and can be accessed through this link: https://cogtaskapp.herokuapp.com/

Some Test Cases for the API when running the local file
https://cogtaskapp.herokuapp.com/report/?dims=country&fields=name,goal
https://cogtaskapp.herokuapp.com/report/?dims=category&fields=name,goal,budget
https://cogtaskapp.herokuapp.com/report/?dims=goal&fields=name,goal,budget

Campaigns can be added using the post method in the form in the application, if the category is not specified
it will get one from the extraction service

