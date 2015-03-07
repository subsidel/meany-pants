var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Video = require(libs + 'model/video');

router.get('/', function(req, res) {

  Video.find(function (err, videos) {
    if (!err) {
      return res.json(videos);
    } else {
      res.statusCode = 500;

      log.error('Internal error(%d): %s',res.statusCode,err.message);

      return res.json({
        error: 'Server error'
      });
    }
  });
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {

  var video = new Video({
    title: req.body.title,
    url: req.body.url
  });

  video.save(function (err) {
    if (!err) {
      log.info("New video created with id: %s", video.id);
      return res.json({
        status: 'OK',
        video:video
      });
    } else {
      if(err.name === 'ValidationError') {
        res.statusCode = 400;
        res.json({
          error: 'Validation error'
        });
      } else {
        res.statusCode = 500;
        res.json({
          error: 'Server error'
        });
      }
      log.error('Internal error(%d): %s', res.statusCode, err.message);
    }
  });
});

router.get('/:id', function(req, res) {

  Video.findById(req.params.id, function (err, video) {

    if(!video) {
      res.statusCode = 404;

      return res.json({
        error: 'Not found'
      });
    }

    if (!err) {
      return res.json({
        status: 'OK',
        video:video
      });
    } else {
      res.statusCode = 500;
      log.error('Internal error(%d): %s',res.statusCode,err.message);

      return res.json({
        error: 'Server error'
      });
    }
  });
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res){
  var videoId = req.params.id;

  Video.findById(videoId, function (err, video) {
    if(!video) {
      res.statusCode = 404;
      log.error('Video with id: %s Not Found', videoId);
      return res.json({
        error: 'Not found'
      });
    }

    video.title = req.body.title;
    video.url = req.body.url;

    video.save(function (err) {
      if (!err) {
        log.info("Video with id: %s updated", video.id);
        return res.json({
          status: 'OK',
          video:video
        });
      } else {
        if(err.name === 'ValidationError') {
          res.statusCode = 400;
          return res.json({
            error: 'Validation error'
          });
        } else {
          res.statusCode = 500;

          return res.json({
            error: 'Server error'
          });
        }
        log.error('Internal error (%d): %s', res.statusCode, err.message);
      }
    });
  });
});


router.delete('/:id', passport.authenticate('bearer', { session: false }), function (req, res){
  var videoId = req.params.id;

  Video.find().remove({id: videoId}, function(err) {
    if (!err) {
      log.info("Video with id: %s deleted", videoId);
      return res.json({
        status: 'OK'
      });
    } else {
      if(err.name === 'ValidationError') {
        res.statusCode = 400;
        return res.json({
          error: 'Validation error'
        });
      } else {
        res.statusCode = 500;

        return res.json({
          error: 'Server error'
        });
      }
    }
  });
});

module.exports = router;
