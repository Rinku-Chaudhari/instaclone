const router = require("express").Router();
const db = require("../db");

//still need to update to get my and my friend post only
router.get("/myFeed/:userId", (req, res) => {
  db.query(
    `SELECT postid,profileimage,id as userId,imageurl AS postimage,username,status,array_length(likers,1) as 
    likers,posteddate FROM posts 
    INNER JOIN users ON (users.id)::text=posts.ownerkey 
    WHERE (posts.ownerkey)::text IN (SELECT unnest(array_append(following,'${req.params.userId}')) 
    FROM users WHERE id=${req.params.userId})`,
    (err, res0) => {
      res.send(res0.rows);
    }
  );
});

router.post("/addPost", (req, res) => {
  db.query(
    `INSERT INTO posts(ownerkey,imageurl,status,posteddate) 
    VALUES('${req.body.ownerKey}','${req.body.imageURL}','${req.body.status}','${req.body.postedDate}')`,
    (err, res0) => {
      if (!err) res.send("done");
      else console.log(err);
    }
  );
});

router.delete("/deletePost/:postId", (req, res) => {
  db.query(
    `DELETE FROM posts WHERE postid='${req.params.postId}'`,
    (err, res0) => {
      if (!err) {
        db.query(
          `DELETE FROM notifications WHERE postid='${req.params.postId}'`,
          (err, res1) => {
            if (!err) res.send("done");
          }
        );
      }
    }
  );
});

//like the post
router.post("/likePost/:postId", (req, res) => {
  db.query(
    `UPDATE posts SET likers=array_append(likers,'${req.body.userId}') WHERE postid='${req.params.postId}'`,
    (err, res0) => {
      if (!err) {
        if (req.body.userId !== req.body.ownerId) {
          db.query(
            `INSERT INTO notifications(notification,ownerid,interactorid,postid,date)
                VALUES('like post',
                '${req.body.ownerId}','${req.body.userId}','${req.params.postId}','${req.body.date}')`,
            (err, res2) => {
              if (!err) res.send("done");
            }
          );
        } else {
          res.send("done");
        }
      } else console.log(err);
    }
  );
});

//unlike the post
router.post("/unlikePost/:postId", (req, res) => {
  db.query(
    `UPDATE posts SET likers=array_remove(likers,'${req.body.userId}') WHERE postid='${req.params.postId}'`,
    (err, res0) => {
      if (!err) {
        db.query(
          `DELETE FROM notifications WHERE interactorid='${req.body.userId}'
                AND ownerid='${req.body.ownerId}' AND notification='like post'`,
          (err, res2) => {
            if (!err) res.send("done");
          }
        );
      }
      if (err) console.log(err);
    }
  );
});

//likedByMe//need update
router.get("/likedByMe/:postId/:userId", (req, res) => {
  db.query(
    `SELECT likers FROM posts WHERE postId='${req.params.postId}'`,
    (err, res0) => {
      if (!err) {
        if (res0.rows.length !== 0) {
          if (res0.rows[0].likers !== null) {
            if (res0.rows[0].likers.includes(req.params.userId)) {
              res.send(true);
            } else {
              res.send(false);
            }
          } else {
            res.send(false);
          }
        } else {
          res.send(false);
        }
      }
      if (err) console.log(err);
    }
  );
});

//getPostLikes
router.get("/postLikes/:postId", (req, res) => {
  db.query(
    `SELECT likers FROM posts WHERE postid='${req.params.postId}'`,
    (err, res0) => {
      if (!err) {
        if (res0.rows !== undefined && res0.rows.length !== 0) {
          const likers = res0.rows[0].likers;
          db.query(
            `SELECT profileimage,id,username FROM users WHERE id IN (${likers})`,
            (err, res1) => {
              res.send(res1.rows);
            }
          );
        } else {
          res.send([]);
        }
      }
    }
  );
});

//num of comments
router.get("/numOfComments/:postId", (req, res) => {
  db.query(
    `SELECT COUNT(*) AS comment FROM comments WHERE postid='${req.params.postId}'`,
    (err, res0) => {
      res.send(res0.rows);
    }
  );
});

router.get(`/getExplorePosts`, (err, res) => {
  db.query(`SELECT postid,imageurl,posteddate FROM posts`, (err, res0) => {
    res.send(res0.rows);
  });
});

router.get(`/getSelectedPost/:postId`, (req, res) => {
  db.query(
    `SELECT postid,profileimage,id as userId,imageurl AS postimage,username,status,array_length(likers,1) as 
  likers,posteddate 
  FROM posts INNER JOIN users ON (posts.ownerkey)::integer=(users.id)::integer 
  WHERE (posts.postid)::integer='${req.params.postId}'::integer `,
    (err, res0) => {
      if (res0 !== undefined) {
        if (res0.rows.length !== 0 && res0.rows !== undefined) {
          res.send(res0.rows[0]);
        } else {
          res.send([]);
        }
      } else {
        res.send([]);
      }
    }
  );
});
module.exports = router;
