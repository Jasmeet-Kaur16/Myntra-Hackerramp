const { exec } = require("child_process");
const fs = require("fs");
const Products = require("../models/products");
const User = require("../models/user");

const Foryou = (phonenumber) => {
  return new Promise((resolve, reject) => {
    exec("python scripts/trend_generator.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return reject(error);
      }

      if (stderr) {
        console.error(`Script error: ${stderr}`);
        return reject(new Error(stderr));
      }

      fs.readFile("topics.txt", "utf8", async (err, data) => {
        if (err) {
          console.error(`Error reading topics file: ${err.message}`);
          return reject(err);
        }

        const topics = data
          .split("\n")
          .map((line) => {
            const cleanedLine = line
              .trim()
              .replace(/['\r,]+/g, "")
              .trim();
            const topic = cleanedLine.split(":")[0].trim();
            return topic;
          })
          .filter((topic) => topic !== "");

        try {
          const user = await User.findOne({ phonenumber }).select("+password");
          if (!user) {
            return reject(new Error("User not found"));
          }

          const searchhistory = user.searchHistory.map((entry) =>
            entry.items.toLowerCase()
          );

          // Check topics against search history
          const matchedTrends = topics.filter((topic) =>
            searchhistory.includes(topic.toLowerCase())
          );

          if (matchedTrends.length > 0) {
            // Fetch products with images that match the trends
            const similarProducts = await Products.find(
              {
                name: {
                  $in: matchedTrends.map((topic) => new RegExp(topic, "i")),
                },
              },
              { p_id: 1, name: 1, img: 1, description: 1 }
            );

            // Extract only the fields you need from similarProducts
            const formattedProducts = similarProducts.map((product) => ({
              //   p_id: product.p_id,
              name: product.name,
              img: product.img,
              //   description: product.description,
            }));

            return resolve({
              status: "success",
              products: formattedProducts,
            });
          } else {
            return resolve({
              status: "success",
              message: "No similar products found based on trends",
            });
          }
        } catch (dbError) {
          console.error(`Database error: ${dbError.message}`);
          return reject(dbError);
        }
      });
    });
  });
};

const Trends = () => {
  return new Promise((resolve, reject) => {
    exec("python scripts/trend_generator.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return reject(error);
      }

      if (stderr) {
        console.error(`Script error: ${stderr}`);
        return reject(new Error(stderr));
      }

      fs.readFile("topics.txt", "utf8", async (err, data) => {
        if (err) {
          console.error(`Error reading topics file: ${err.message}`);
          return reject(err);
        }

        const topics = data
          .split("\n")
          .map((line) => {
            const cleanedLine = line
              .trim()
              .replace(/['\r,]+/g, "")
              .trim();
            const topic = cleanedLine.split(":")[0].trim();
            return topic;
          })
          .filter((topic) => topic !== "");

        try {
          if (topics.length > 0) {
            // Fetch products with images that match the trends
            const similarProducts = await Products.find(
              {
                name: {
                  $in: topics.map((topic) => new RegExp(topic, "i")),
                },
              },
              { p_id: 1, name: 1, img: 1, description: 1 }
            );

            // Extract only the fields you need from similarProducts
            const formattedProducts = similarProducts.map((product) => ({
              p_id: product._id,
              name: product.name,
              img: product.img,
              description: product.description,
            }));

            return resolve({
              status: "success",
              products: formattedProducts,
            });
          } else {
            return resolve({
              status: "success",
              message: "No trends found",
            });
          }
        } catch (dbError) {
          console.error(`Database error: ${dbError.message}`);
          return reject(dbError);
        }
      });
    });
  });
};

const Combined = async (phonenumber) => {
  try {
    const forYouResult = await Foryou(phonenumber);
    const trendsResult = await Trends();

    return {
      status: "success",
      forYou: forYouResult.products || [],
      trends: trendsResult.products || [],
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

module.exports = {
  Foryou,
  Trends,
  Combined,
};
