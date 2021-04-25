# FS1030_GroupC

Hi there!

As always, first run "npm install" to install all of the dependancies.

'npm start' will launch the React frontend on port 3000 and the Express backend on port 4000.

The site needs to access a MySQL database named 'emr_group_c'
    initial login and user details are in src/database/connection.js.  
    The src/database/emr_group_c_db.sql file contains the database schema.  
    user_setup.sql contains the default user to setup that the site will be looking for.  
    insert_dummy_script.sql contains a data dump to add some starting patients, careproviders, and admin users to the tables.  
    Secondary tables like notes and revision details are not included but that data can be added once you login.

You can see the login details for users in the user table 
    -- for quick access, login as a super Admin with username: SSUPER password:333 and as one of the Care Providers as SSTRANGE password 123.

All SQL commands are located in /src/routes/routes.js
SQL Commands by line:
    patient READ - 12
    patient UPDATE - 22
    patient CREATE - 36
    patient DELETE - 50
    patient to careprovider CREATE - 67
    careprovider READ - 81
    careprovider UPDATE - 91
    careprovider CREATE - 105
    careprovider DELETE - 119
    search patient READ - 137, 139, 153, 155, 169, 171
    search careprovider READ - 186, 195, 204
    revisionDetail READ - 216-221
    revisionDetail CREATE - 233
    revisionDetail Careprovider READ - 245-250
    login POST - 269
    address READ - 306, 308
    address UPDATE - 322
    address CREATE - 336
    address DELETE - 347
    emergency READ - 362
    emergency UPDATE - 373
    emergency CREATE - 387
    emergency DELETE - 400
    notes READ - 413
    notes UPDATE - 424
    notes CREATE - 438
    <!-- notes DELETE - 449 -->
    summary READ - 464
    summary UPDATE - 475
    summary CREATE - 489
    summary DELETE - 502
