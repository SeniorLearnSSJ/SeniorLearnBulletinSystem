Testing
Done via REST Client: visual studio code extension by Huachao Mao

Backend Testing Only
Test Cases


Login
1. Test Member login 
(username: AnonUser123, Password: user123)
2. Test Admin login 
(username: Admin, Password: user123)
3. Test login with incorrect info 
(username:Steven, Password: user123)

bulletin to MemberBulletin list
Member Bulletin
4. Test Get Member bulletin list by category; interest, events, and updates. 
Requirements: valid login (username: AnonUser123, Password: user123)
5. Test Invalid Get Member Bullet list
6. Test Get (View) of a Member Bulletin
7. Test posting bulletin to each category of Member bulletin- Interest
8. Test posting bulletin to each category of Member bulletin- Events
9. Test posting bulletin to a False category type
10. Test Update(edit) to existing Member bulletin list (Change title + Content)
11. Test Delete existing Member Bulletin


Official Bulletin
12. Test Get Official Bulletin Functionality. No login requirements necessary.
13. Test POST new Official Bulletin. Requirement (username: Admin, Password: user123)
14. Test POST new Official Bulletin with MemberId. Requirement( username:Anon123, Password:user123)
15. Test Update Official Bulletin. Requirement (username: Admin, Password: user123, Existing Official Bulletin)
16. Test update Official Bulletin with MemberId. Requirement
( username:Anon123, Password:user123)
17. Test Delete Official Bulletin
18. Test Delete Official Bulletin with MemberId. Requirement
( username:Anon123, Password:user123)


User Profile
Get, update, post(registration)
19. Test Get User Profile with just the Bearer Token
20. Test Update User Profile 
User Settings
Get, update, post (registration)
21. Test Get User settings
22. Test Update User settings



Registration
23. Test posting new User Profile and Settings
Registration: 
    "Username": "UltraSteven",
    "Password": "HelloKitty",
    "FirstName": "Steven The Great",
    "LastName": "Forgot his Last Name",
    "Email": "stevennotsogreat@gmail.com"
24. Check User Settings of Newly added User
25. Reusing Username


Results
Date: 11/6/25
Failed Test Cases: 4,


