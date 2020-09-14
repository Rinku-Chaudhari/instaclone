const router = require("express").Router();
const db = require("../db");

router.post("/addComment", (req, res) => {
  console.log(req.body);
  db.query(
    `INSERT INTO comments(comment,commenterid,postid,postownerid,posteddate) 
    VALUES('${req.body.comment}','${req.body.commenterId}','${req.body.postId}',
    '${req.body.postOwnerId}','${req.body.postedDate}')`,
    (err, res0) => {
      if (!err) {
        if (req.body.commenterId != req.body.postOwnerId) {
          db.query(
            `INSERT INTO notifications(notification,ownerid,postid,interactorid,date)
                VALUES('comment added',
                '${req.body.postOwnerId}','${req.body.postId}','${req.body.commenterId}',
                '${req.body.postedDate}')`,
            (err, res2) => {
              if (!err) res.send("done");
            }
          );
        } else {
          res.send("done");
        }
      }
    }
  );
});

router.get(`/getComments/:postId`, (req, res) => {
  db.query(
    `SELECT array_length(likers,1) as likers,id as ownerId,
    username,
    profileimage,comment,posteddate,commentid,commenterid 
    from comments 
    INNER JOIN users ON users.id=(comments.commenterid)::integer WHERE comments.postid='${req.params.postId}'`,
    (err, res0) => {
      if (!err) res.send(res0.rows);
      else console.log(err);
    }
  );
});

router.delete(`/deleteComment/:commentId`, (req, res) => {
  db.query(
    `DELETE FROM comments WHERE commentid='${req.params.commentId}'`,
    (err, res0) => {
      if (!err) res.send("done");
      else console.log(err);
    }
  );
});

router.get("/likedByMe/:commentId/:userId", (req, res) => {
  db.query(
    `SELECT likers FROM comments WHERE commentid='${req.params.commentId}'`,
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

//like comment
router.post(`/likeComment/:commentId`, (req, res) => {
  db.query(
    `UPDATE comments SET likers=array_append(likers,'${req.body.likerId}') 
  WHERE commentid='${req.params.commentId}'`,
    (err, res0) => {
      if (!err) {
        if (req.body.likerId !== req.body.ownerId) {
          db.query(
            `INSERT INTO notifications(notification,ownerid,postid,interactorid,date)
                VALUES('like comment',
                '${req.body.ownerId}','${req.body.postId}','${req.body.likerId}','${req.body.date}')`,
            (err, res2) => {
              if (!err) res.send("done");
            }
          );
        } else {
          res.send("done");
        }
      }
    }
  );
});

router.post(`/unlikeComment/:commentId`, (req, res) => {
  db.query(
    `UPDATE comments SET likers=array_remove(likers,'${req.body.likerId}') 
    WHERE commentid='${req.params.commentId}'`,
    (err, res0) => {
      if (!err) res.send("done");
    }
  );
});

router.get("/commentLikes/:commentId", (req, res) => {
  db.query(
    `SELECT likers FROM comments WHERE commentid='${req.params.commentId}'`,
    (err, res0) => {
      if (!err) {
        if (res0.rows !== undefined) {
          const likers = res0.rows[0].likers;
          db.query(
            `SELECT profileimage,id,username FROM users WHERE id IN (${likers})`,
            (err, res1) => {
              if (res1 !== undefined) {
                res.send(res1.rows);
              } else {
                res.send([]);
              }
            }
          );
        } else {
          res.send([]);
        }
      }
    }
  );
});

router.get(`/getPostOwnerId/:postId`, (req, res) => {
  db.query(
    `SELECT ownerkey FROM posts WHERE postid='${req.params.postId}'`,
    (err, res0) => {
      res.send(res0.rows);
    }
  );
});

module.exports = router;
