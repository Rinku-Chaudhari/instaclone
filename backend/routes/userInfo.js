const router = require("express").Router();
const db = require("../db");

router.get(`/getUnseen/:userId`, (req, res) => {
  db.query(
    `SELECT id FROM notifications WHERE ownerid='${req.params.userId}' AND seen=false`,
    (err, res0) => {
      if (!err) res.send(res0.rows);
    }
  );
});

router.get("/getNotifications/:userId", (req, res) => {
  db.query(
    `SELECT posts.postid as postid,imageurl as postimage,username,notifications.id as id,notification,seen,
    date,profileimage FROM notifications 
    LEFT JOIN users ON users.id=(notifications.interactorid)::integer
    LEFT JOIN posts ON posts.postid=(notifications.postid)::integer
    WHERE notifications.ownerid='${req.params.userId}'`,
    (err, res0) => {
      if (err) console.log(err);
      if (!err) res.send(res0.rows);
    }
  );
});

router.get("/currentUserData/:userId", (req, res) => {
  db.query(
    `SELECT username,id,profileimage,username,bio FROM users WHERE id='${req.params.userId}' `,
    (err, res0) => {
      res.send(res0.rows[0]);
    }
  );
});

router.get("/getUserData/:username/:checkingId", (req, res) => {
  db.query(
    `SELECT id,(${req.params.checkingId})::text 
    IN (SELECT unnest(followers) FROM users WHERE username='${req.params.username}') AS followedByMe,
    profileimage,username,array_length(followers,1) 
    as followers,array_length(following,1) as following,
    bio FROM users 
    WHERE username='${req.params.username}'`,
    (err, res0) => {
      if (!err) {
        db.query(
          `SELECT postid,profileimage,id as userId,imageurl AS postimage,username,status,array_length(likers,1) as 
    likers,posteddate FROM posts INNER JOIN users 
    ON (users.id)::text=posts.ownerkey WHERE posts.ownerkey='${
      res0.rows.length > 0 ? res0.rows[0].id : "0"
    }'`,
          (err1, res1) => {
            if (err1) console.log(err1);
            if (!err1) res.send({ userData: res0.rows, posts: res1.rows });
          }
        );
      }
    }
  );
});

router.post("/follow", (req, res) => {
  db.query(
    `UPDATE users SET following=array_append(following,'${req.body.followingId}')
    WHERE id='${req.body.followerId}'`,
    (err, res0) => {
      if (!err) {
        db.query(
          `UPDATE users SET followers=array_append(followers,'${req.body.followerId}')
        WHERE id='${req.body.followingId}'`,
          (err, res1) => {
            if (!err) {
              db.query(
                `INSERT INTO notifications(notification,ownerid,interactorid,date)
                VALUES('follow',
                '${req.body.followingId}','${req.body.followerId}','${req.body.date}')`,
                (err, res2) => {
                  if (!err) res.send("done");
                }
              );
            }
            console.log(err);
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/unfollow", (req, res) => {
  db.query(
    `UPDATE users SET following=array_remove(following,'${req.body.unfollowingId}')
    WHERE id='${req.body.unfollowerId}'`,
    (err, res0) => {
      if (!err) {
        db.query(
          `UPDATE users SET followers=array_remove(followers,'${req.body.unfollowerId}')
        WHERE id='${req.body.unfollowingId}'`,
          (err, res1) => {
            if (!err) {
              db.query(
                `DELETE FROM notifications WHERE interactorid='${req.body.unfollowerId}' 
                AND notification='follow'`,
                (err, res2) => {
                  if (!err) res.send("done");
                }
              );
            }
            console.log(err);
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/getFollowers/:userId", (req, res) => {
  db.query(
    `SELECT followers FROM users WHERE id='${req.params.userId}'`,
    (err, res0) => {
      if (!err) {
        if (res0.rows !== undefined && res0.rows.length !== 0) {
          const followers = res0.rows[0].followers;
          db.query(
            `SELECT profileimage,id,username FROM users WHERE id IN (${followers})`,
            (err, res1) => {
              if (res1 === undefined) {
                res.send([]);
              } else {
                res.send(res1.rows);
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

router.get("/getFollowings/:userId", (req, res) => {
  db.query(
    `SELECT following FROM users WHERE id='${req.params.userId}'`,
    (err, res0) => {
      if (!err) {
        if (res0.rows !== undefined && res0.rows.length !== 0) {
          const following = res0.rows[0].following;
          db.query(
            `SELECT profileimage,id,username FROM users WHERE id IN (${following})`,
            (err, res1) => {
              if (res1 === undefined) {
                res.send([]);
              } else {
                res.send(res1.rows);
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

router.post("/updateUsernameAndBio/:username", (req, res) => {
  if (req.body.bio.length > 100) {
    res.send("Bio must be less than 100 characters.");
  } else {
    if (
      req.body.username.length >= 5 &&
      req.body.username.length <= 20 &&
      !req.body.username.includes(" ")
    ) {
      db.query(
        `SELECT username FROM users WHERE username='${req.body.username}'`,
        (err, res0) => {
          if (
            res0.rows.length === 0 ||
            req.body.username === req.body.initialUsername
          ) {
            db.query(
              `UPDATE users SET (username,bio)=('${req.body.username}','${req.body.bio}') 
              WHERE username='${req.body.initialUsername}';`,
              (err, res1) => {
                if (!err) res.send("done");
                else console.log(err);
              }
            );
          } else {
            res.send("username is already taken");
          }
        }
      );
    } else {
      res.send("username must be spaceless between 5 and 20 characters.");
    }
  }
});

router.post(`/updateProfilePic/:username`, (req, res) => {
  db.query(
    `UPDATE users SET profileimage='${req.body.profileImage}' WHERE username='${req.params.username}'`,
    (err, res0) => {
      if (!err) res.send("done");
    }
  );
});

router.get(`/getRecommended/:userId`, (req, res) => {
  db.query(
    `SELECT profileimage,id,username FROM users WHERE (id)::text 
    IN (SELECT unnest(followers) FROM users WHERE id=${req.params.userId}) 
    AND (id)::text NOT IN (SELECT unnest(following) FROM users WHERE id=${req.params.userId})`,
    (err, res0) => {
      if (!err) res.send(res0.rows);
    }
  );
});

router.get(`/searchUsers/:query`, (req, res) => {
  db.query(
    `SELECT id,profileimage,username FROM users WHERE username LIKE '${req.params.query}%'`,
    (err, res0) => {
      if (err) console.log(err);
      res.send(res0.rows);
    }
  );
});

router.post(`/updateSeen/:userId`, (req, res) => {
  db.query(
    `UPDATE notifications SET seen=true WHERE ownerid='${req.params.userId}'`,
    (err, res0) => {
      if (!err) res.send("done");
    }
  );
});

module.exports = router;
