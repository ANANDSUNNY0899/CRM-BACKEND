const Customer = require('../models/Customer');


const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user._id });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    
    if (customer.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    
    const customer = await Customer.create({
      user: req.user._id,
      name,
      email,
      phone,
      company,
      status,
      notes
    });
    
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    
    const customer = await Customer.findById(req.params.id);
    
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    
    if (customer.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
  
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.company = company || customer.company;
    customer.status = status || customer.status;
    customer.notes = notes || customer.notes;
    
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    
    if (customer.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
  
    await Customer.deleteOne({ _id: req.params.id });
    res.json({ message: 'Customer removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};