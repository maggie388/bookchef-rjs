Instructions for running this project:
1. Run npm install in the client folder and server folder

5. Create a MySQL database called bookchef locally and make sure ./server/knexfile.js points to the database.

6. In ./server run knex migrate:latest and then knex seed:run

6. Follow these instructions to get a private key for the Vision API https://cloud.google.com/vision/docs/setup

7. Download the JSON file that contains your API service account key 

8. Set an environment variable called GOOGLE_APPLICATION_CREDENTIALS and point it to where you have saved the file
    Example: export GOOGLE_APPLICATION_CREDENTIALS=/home/user/Downloads/my-key.json

9. Use one or both of these mock user credentials to log in and use the application:
    --> username: Jane, password: password3
    --> username: Jim, password: password33
