const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  return db(tableName)
    .where({ review_id: reviewId })
    .del();
}

async function list(movie_id) {
  console.log('list movie reviews id', movie_id);
  
  const reviews = await db
    .from("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ "r.movie_id": movie_id });
  
  // Reshape the reviews data to include a nested critic object
  return reviews.map(review => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    created_at: review.created_at,
    updated_at: review.updated_at,
    critic: {
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
    },
    movie_id: review.movie_id
  }));}
// async function list(movie_id) {
//   return db(tableName)
//     .select("*")
//     .modify(queryBuilder => {
//       if (movie_id) {
//         queryBuilder.where({ movie_id });
//       }
//     });
// }

async function read(reviewId) {
  const review_id = reviewId;
  return db(tableName)
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

async function readCritic(critic_id) {
  return db("critics")
    .where({ critic_id })
    .first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db
    .from(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);


}

module.exports = {
  destroy,
  list,
  read,
  update,
};
