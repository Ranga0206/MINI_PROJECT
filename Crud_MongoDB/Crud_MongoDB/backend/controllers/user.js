import User from "../models/User.js";

//Get All Users
const getAllUser = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const query = { name: { $regex: search, $options: "i" } };
  const total = await User.countDocuments(query);
  const user = await User.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  return res.json({ data: user, total, total_page: Math.ceil(total / limit) });
};

//Add User
const addUser = async (req, res) => {
  const user = await User.create(req.body);
  return res.json(user);
};

//Update User
const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  return res.json(user);
};

//Get One User
const getOneUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.json(user);
};

//DELETE USER

const deleteUser = async (req, res) => {
  const id = req.params.id;

  await User.findByIdAndDelete(id);

  return res.json({ message: "User detail delete!" });
};

const seeDummyUsers = async (req, res) => {
  const dummy = [
    {
      name: "Ramiro Kutch",
      email: "Ignacio59@yahoo.com",
      age: 42,
    },
    {
      name: "Miss Lillian Schiller",
      email: "Demetrius.Kuphal1@yahoo.com",
      age: 99,
    },
    {
      name: "Morris Bashirian IV",
      email: "Yazmin82@hotmail.com",
      age: 21,
    },
    {
      name: "Dolores Hamill",
      email: "Jordyn.Will70@gmail.com",
      age: 55,
    },
    {
      name: "Harold Olson",
      email: "Ryann.Feest11@hotmail.com",
      age: 56,
    },
    {
      name: "Belinda Hills",
      email: "Toney_Dibbert18@gmail.com",
      age: 21,
    },
    {
      name: "Dr. Garry Rau",
      email: "Reanna_Abshire@yahoo.com",
      age: 33,
    },
    {
      name: "Mr. Amelia Carter",
      email: "Augustus.Murphy97@yahoo.com",
      age: 82,
    },
    {
      name: "Kimberly Quitzon",
      email: "Ruth.Barton58@gmail.com",
      age: 21,
    },
    {
      name: "Leland Abernathy",
      email: "Dawn.Ledner36@gmail.com",
      age: 36,
    },
    {
      name: "Salvatore Wuckert",
      email: "Rosetta_Rempel38@hotmail.com",
      age: 44,
    },
    {
      name: "Ms. Luis Murray",
      email: "Geovanny.Pagac@gmail.com",
      age: 82,
    },
    {
      name: "Calvin Gislason",
      email: "Finn_Abshire@gmail.com",
      age: 26,
    },
    {
      name: "Ms. Mark Trantow",
      email: "Chris15@gmail.com",
      age: 76,
    },
    {
      name: "Marianne Bayer",
      email: "Jayme7@hotmail.com",
      age: 96,
    },
    {
      name: "Ted Bernhard",
      email: "Roderick88@gmail.com",
      age: 61,
    },
    {
      name: "Alfonso Upton II",
      email: "Verla17@yahoo.com",
      age: 75,
    },
    {
      name: "Kim Cormier",
      email: "Hugh_Lesch@hotmail.com",
      age: 49,
    },
    {
      name: "Marshall Welch",
      email: "Linda.Kub@hotmail.com",
      age: 34,
    },
    {
      name: "Courtney Robel",
      email: "Jovan_Nikolaus@hotmail.com",
      age: 39,
    },
    {
      name: "Sue Erdman",
      email: "Jakob.Walter@yahoo.com",
      age: 85,
    },
    {
      name: "Mr. Rita Leffler",
      email: "Wilson62@gmail.com",
      age: 29,
    },
    {
      name: "Naomi Cartwright",
      email: "Alycia.Prohaska33@yahoo.com",
      age: 68,
    },
    {
      name: "Darlene Abshire",
      email: "Karolann.DAmore1@gmail.com",
      age: 30,
    },
    {
      name: "Iris Conroy",
      email: "Nils.Johns83@yahoo.com",
      age: 36,
    },
    {
      name: "Ms. Matthew Connelly",
      email: "Lane39@yahoo.com",
      age: 84,
    },
    {
      name: "Clark Runolfsdottir",
      email: "Lonie49@gmail.com",
      age: 26,
    },
    {
      name: "Ms. Ellen Kessler",
      email: "Theo_Kilback21@hotmail.com",
      age: 58,
    },
    {
      name: "Jordan Von",
      email: "Naomie.Treutel@yahoo.com",
      age: 44,
    },
    {
      name: "Lowell Brekke",
      email: "Ezra_Haley31@yahoo.com",
      age: 97,
    },
  ];
  try {
    const users = await User.insertMany(dummy);
    return res.status(201).json({
      message: "Dummy users inserted",
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllUser,
  addUser,
  updateUser,
  getOneUser,
  deleteUser,
  seeDummyUsers,
};
