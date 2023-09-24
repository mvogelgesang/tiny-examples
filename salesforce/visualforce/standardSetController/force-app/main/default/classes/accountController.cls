public with sharing class accountController {
    private final Account acct;
    public List<Contact> editiedContacts;
    public ApexPages.StandardSetController ssc {
        get {
            if (ssc == null) {
                List<Contact> contacts = [SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE AccountId =:acct.Id];
                ssc = new ApexPages.StandardSetController(contacts);
            }
            return ssc;
        }
        set;
    }
    public accountController(ApexPages.StandardController stdController) {
        this.acct = (Account)stdController.getRecord();
        this.editiedContacts = new List<Contact>();
    }
    

    public String getGreeting() {
        return 'Hello  (' + acct.id + ')';
    }
    public List<Contact> getEditedContacts() {
        return this.editiedContacts;
    }
    public List<Contact> getContacts() {
        ssc.setPageSize(3);
        return (List<Contact>) ssc.getRecords();
    }
    public void fieldChange() {
        System.debug('field was changed');
        
    }

    public Integer getPage() {
        return ssc.getPageNumber();
    }
    public Integer getTotalPages() {
        return ssc.getResultSize();
    }
}