// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents


List<Account> accounts = [SELECT Id FROM Account];
List<Contact> contacts = new List<Contact>();
  for (Integer i = 0; i<25; i++) {
    Contact c = new Contact();
    c.FirstName = 'fname '+i;
    c.LastName = 'lname '+i;
    c.Phone = '555-222-9999';
    c.Email = 'hello'+i+'@example.com';
    c.AccountId = accounts[0].Id;
    contacts.add(c);
  }


insert contacts;