# IIIT-L Placement Portal

Clone the project and create a .env file in the root folder.

Contents of the file:

```text
SECRET = For secret, contact RDT
MONGO_URI = "mongodb+srv://<username>:<password>@placement-portal.8qvst.mongodb.net/placement_test?retryWrites=true&w=majority"
PORT = 5000
```

Replace \<username\> with your mongodb username and \<password\> with your password

For new username and password or SECRET, please email your request to RDT at `lcs2019032@iiitl.ac.in`

Now run

```bash
npm run dev
```

This will start the portal on localhost 5000
