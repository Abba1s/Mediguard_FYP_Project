// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {
    //Smart Contract owner will be the person who deploys the contract only he can authorize various roles like retailer, Manufacturer,etc
    address public Owner;

    //note this constructor will be called when smart contract will be deployed on blockchain
    constructor() public {
        Owner = msg.sender;
    }

    //Roles (flow of pharma supply chain)
    // RawMaterialSupplier; //This is where Manufacturer will get raw materials to make medicines
    // Manufacturer;  //Various WHO guidelines should be followed by this person
    // Distributor; //This guy distributes the medicines to retailers
    // Retailer; //Normal customer buys from the retailer

    //modifier to make sure only the owner is using the function
    modifier onlyByOwner() {
        require(msg.sender == Owner,  "Only Contract Owner aka Admin can call this");
        _;
    }

    event medReg(uint _medId, string name, string description);

    //stages of a medicine in pharma supply chain
    enum STAGE {
        Init,
        RawMaterialSupply,
        Manufacture,
        Distribution,
        Retail,
        sold
    }
    //using this we are going to track every single medicine the owner orders

    //Medicine count
    uint256 public medicineCtr = 0;
    //Raw material supplier count
    uint256 public rmsCtr = 0;
    //Manufacturer count
    uint256 public manCtr = 0;
    //distributor count
    uint256 public disCtr = 0;
    //retailer count
    uint256 public retCtr = 0;

    //To store information about the medicine
    struct medicine {
        uint256 id; //unique medicine id
        string name; //name of the medicine
        string description; //about medicine
        uint256 RMSid; //id of the Raw Material supplier for this particular medicine
        uint256 MANid; //id of the Manufacturer for this particular medicine
        uint256 DISid; //id of the distributor for this particular medicine
        uint256 RETid; //id of the retailer for this particular medicine
        STAGE stage; //current medicine stage
    }

    //To store all the medicines on the blockchain
    mapping(uint256 => medicine) public MedicineStock;

    //To show status to client applications
    function showStage(uint256 _medicineID)
        public
        view
        returns (string memory _stage)
    {
        require(medicineCtr > 0);
        if (MedicineStock[_medicineID].stage == STAGE.Init)
            return "Medicine Ordered";
        else if (MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply)
            return "Raw Material Supply Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Manufacture)
            return "Manufacturing Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Distribution)
            return "Distribution Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Retail)
            return "Retail Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.sold)
            return "Medicine Sold";
    }

    //To store information about raw material supplier
    struct rawMaterialSupplier {
        address addr;
        uint256 id_no; //supplier id_no
        string name; //Name of the raw material supplier
        string place; //Place the raw material supplier is based in
    }

    //To store all the raw material suppliers on the blockchain
    mapping(uint256 => rawMaterialSupplier) public RMS;

    //To store information about manufacturer
    struct manufacturer {
        address addr;
        uint256 id_no; //manufacturer id_no
        string name; //Name of the manufacturer
        string place; //Place the manufacturer is based in
    }

    //To store all the manufacturers on the blockchain
    mapping(uint256 => manufacturer) public MAN;

    //To store information about distributor
    struct distributor {
        address addr;
        uint256 id_no; //distributor id_no
        string name; //Name of the distributor
        string place; //Place the distributor is based in
    }

    //To store all the distributors on the blockchain
    mapping(uint256 => distributor) public DIS;

    //To store information about retailer
    struct retailer {
        address addr;
        uint256 id_no; //retailer id_no
        string name; //Name of the retailer
        string place; //Place the retailer is based in
    }

    //To store all the retailers on the blockchain
    mapping(uint256 => retailer) public RET;

    //To add raw material suppliers. Only contract owner can add a new raw material supplier
    function addRMS(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner {
        rmsCtr++;
        RMS[rmsCtr] = rawMaterialSupplier(_address, rmsCtr, _name, _place);
    }

    //To add manufacturer. Only contract owner can add a new manufacturer
    function addManufacturer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner {
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place);
    }

    //To add distributor. Only contract owner can add a new distributor
    function addDistributor(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner {
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place);
    }

    //To add retailer. Only contract owner can add a new retailer
    function addRetailer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner {
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place);
    }

    //To supply raw materials from RMS supplier to the manufacturer
    function RMSsupply(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr,"No medicines found");
        uint256 _id = findRMS(msg.sender);
        require(_id > 0, "Only Supplier account can supply");
        require(MedicineStock[_medicineID].stage == STAGE.Init,  "Orderd should be placed and MED at the Init stage to get Supplied" );
        MedicineStock[_medicineID].RMSid = _id;
        MedicineStock[_medicineID].stage = STAGE.RawMaterialSupply;
    }

    //To check if RMS is available in the blockchain
    function findRMS(address _address) private view returns (uint256) {
        require(rmsCtr > 0);
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return RMS[i].id_no;
        }
        return 0;
    }


    //To supply medicines from Manufacturer to distributor
    function Distribute(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr,"No medicines found");
        uint256 _id = findDIS(msg.sender);
        require(_id > 0,"Only distributor account can distribute");
        require(MedicineStock[_medicineID].stage == STAGE.Manufacture, "Medicine should be at the Manufacture stage to get distributed");
        MedicineStock[_medicineID].DISid = _id;
        MedicineStock[_medicineID].stage = STAGE.Distribution;
    }

    //To check if distributor is available in the blockchain
    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id_no;
        }
        return 0;
    }

    //To supply medicines from distributor to retailer
    function Retail(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "No medicines found");
        uint256 _id = findRET(msg.sender);
        require(_id > 0, "Only Retailer account can retail");
        require(MedicineStock[_medicineID].stage == STAGE.Distribution, "Medicine should be at the distribiution stage to get retailed");
        MedicineStock[_medicineID].RETid = _id;
        MedicineStock[_medicineID].stage = STAGE.Retail;
    }

    //To check if retailer is available in the blockchain
    function findRET(address _address) private view returns (uint256) {
        require(retCtr > 0);
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id_no;
        }
        return 0;
    }

    //To sell medicines from retailer to consumer
    function sold(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "No medicines found");
        uint256 _id = findRET(msg.sender);
        require(_id > 0, "Only Retailer account can sell");
        require(_id == MedicineStock[_medicineID].RETid); //Only correct retailer can mark medicine as sold
        require(MedicineStock[_medicineID].stage == STAGE.Retail, "Medicine should be at the Retail stage to get sold");
        MedicineStock[_medicineID].stage = STAGE.sold;
    }


    // Find MAN

      function findMAN(address _address) private view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id_no;
        }
        return 0;
    }

    // To add new medicines to the stock
    function addMedicine(uint _medId, string memory _name, string memory _description )
        public
    {
        require((rmsCtr > 0) && (manCtr > 0) && (disCtr > 0) && (retCtr > 0));
        uint256 _id = findMAN(msg.sender);
        require(_id > 0, "Only Manufacturer account can manufacture medicines");
        require(MedicineStock[_medId].stage == STAGE.RawMaterialSupply, "id Should be at the raw-material-supply stage");
        MedicineStock[_medId] = medicine(
            _medId,
            _name,
            _description,
            MedicineStock[_medId].RMSid,
            _id,
            0,
            0,
            STAGE.Manufacture
        );
        emit medReg(_medId, _name, "Medicine Registered Successfully!");
    }
     function placeOrder()
        public
        onlyByOwner
    {
        require((rmsCtr > 0) && (manCtr > 0) && (disCtr > 0) && (retCtr > 0), "Add all the members of the Supply Chain");
       
        medicineCtr++;
        MedicineStock[medicineCtr] = medicine(
            medicineCtr,
            "",
            "",
            0,
            0,
            0,
            0,
            STAGE.Init
        );
    }
}
