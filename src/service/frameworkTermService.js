/**
 * @file  : frameworkTermService.js
 * @author: Rajath V B
 * @desc  : controller file for handle domain and concepts.
 */

var async = require('async')
var path = require('path')
var respUtil = require('response_util')
var ekStepUtil = require('sb_content_provider_util')
var logger = require('sb_logger_util_v2')
var messageUtils = require('./messageUtil')
var utilsService = require('../service/utilsService')

var filename = path.basename(__filename)
var responseCode = messageUtils.RESPONSE_CODE

/**
 * This function helps to get all domain from ekstep
 * @param {Object} req
 * @param {Object} response
 */

function getFrameworkTerm (req, response) {
  var data = {}
  var rspObj = req.rspObj

  data.body = req.body
  data.category = req.params.categoryID
  data.queryParams = req.query
  // Adding telemetry object data
  if (rspObj.telemetryData) {
    rspObj.telemetryData.object = utilsService.getObjectData(data.category, 'frameworkTerm', '', {})
  }

  if (!data.queryParams) {
    rspObj.responseCode = responseCode.CLIENT_ERROR
    logger.error({
      msg: 'Error due to missing query Parameters',
      err: {responseCode: rspObj.responseCode},
      additionalInfo: { data }
    }, req)
    return response.status(400).send(respUtil.errorResponse(rspObj))
  }

  async.waterfall([

    function (CBW) {
      logger.debug({ msg: 'Request to get Framework Terms', additionalInfo: { data } }, req)
      ekStepUtil.getFrameworkTerm(data.queryParams, data.category, req.headers, function (err, res) {
        if (err || res.responseCode !== responseCode.SUCCESS) {
          rspObj.responseCode = res && res.responseCode ? res.responseCode : responseCode.SERVER_ERROR
          logger.error({
            msg: 'Error while fetching framework terms from ekstep',
            err: {
              err,
              responseCode: rspObj.responseCode
            },
            additionalInfo: {data}
          }, req)
          var httpStatus = res && res.statusCode >= 100 && res.statusCode < 600 ? res.statusCode : 500
          rspObj.result = res && res.result ? res.result : {}
          rspObj = utilsService.getErrorResponse(rspObj, res)
          return response.status(httpStatus).send(respUtil.errorResponse(rspObj))
        } else {
          CBW(null, res)
        }
      })
    },

    function (res) {
      rspObj.result = res.result
      return response.status(200).send(respUtil.successResponse(rspObj))
    }
  ])
}

function frameworkTermSearch (req, response) {
  var rspObj = req.rspObj
  var data = req.body
  data.queryParams = req.query
  if (!data) {
    rspObj.responseCode = responseCode.CLIENT_ERROR
    logger.error({
      msg: 'Error due to missing query Parameters or request body',
      err: {responseCode: rspObj.responseCode},
      additionalInfo: { data }
    }, req)
    return response.status(400).send(respUtil.errorResponse(rspObj))
  }

  var ekStepReqData = {
    request: data.request
  }

  async.waterfall([

    function (CBW) {
      logger.debug({ msg: 'Request to search Framework Terms', additionalInfo: { data } }, req)
      ekStepUtil.frameworkTermSearch(ekStepReqData, data.queryParams, req.headers, function (err, res) {
        if (err || res.responseCode !== responseCode.SUCCESS) {
          rspObj.responseCode = res && res.responseCode ? res.responseCode : responseCode.SERVER_ERROR
          logger.error({
            msg: 'Error while searching framework terms from ekstep',
            err: {
              err,
              responseCode: rspObj.responseCode
            },
            additionalInfo: {data}
          }, req)
          var httpStatus = res && res.statusCode >= 100 && res.statusCode < 600 ? res.statusCode : 500
          rspObj.result = res && res.result ? res.result : {}
          rspObj = utilsService.getErrorResponse(rspObj, res)
          return response.status(httpStatus).send(respUtil.errorResponse(rspObj))
        } else {
          CBW(null, res)
        }
      })
    },

    function (res) {
      rspObj.result = res.result
      return response.status(200).send(respUtil.successResponse(rspObj))
    }
  ])
}

function frameworkTermCreate (req, response) {
  var rspObj = req.rspObj
  var data = req.body
  data.queryParams = req.query
  if (!data) {
    rspObj.responseCode = responseCode.CLIENT_ERROR
    logger.error({
      msg: 'Error due to missing query Parameters or request body',
      err: {responseCode: rspObj.responseCode},
      additionalInfo: { data }
    }, req)
    return response.status(400).send(respUtil.errorResponse(rspObj))
  }

  var ekStepReqData = {
    request: data.request
  }

  async.waterfall([

    function (CBW) {
      logger.debug({ msg: 'Request to create Framework Terms', additionalInfo: { data } }, req)
      ekStepUtil.frameworkTermCreate(ekStepReqData, data.queryParams, req.headers, function (err, res) {
        if (err || res.responseCode !== responseCode.SUCCESS) {
          rspObj.responseCode = res && res.responseCode ? res.responseCode : responseCode.SERVER_ERROR
          logger.error({
            msg: 'Error while creating framework terms from ekstep',
            err: {
              err,
              responseCode: rspObj.responseCode
            },
            additionalInfo: {data}
          }, req)
          var httpStatus = res && res.statusCode >= 100 && res.statusCode < 600 ? res.statusCode : 500
          rspObj.result = res && res.result ? res.result : {}
          rspObj = utilsService.getErrorResponse(rspObj, res)
          return response.status(httpStatus).send(respUtil.errorResponse(rspObj))
        } else {
          CBW(null, res)
        }
      })
    },

    function (res) {
      rspObj.result = res.result
      return response.status(200).send(respUtil.successResponse(rspObj))
    }
  ])
}

function frameworkTermUpdate (req, response) {
  var rspObj = req.rspObj
  var data = req.body
  data.queryParams = req.query
  data.category = req.params.categoryID
  // Adding telemetry object data
  if (rspObj.telemetryData) {
    rspObj.telemetryData.object = utilsService.getObjectData(data.category, 'frameworkTerm', '', {})
  }

  if (!data) {
    rspObj.responseCode = responseCode.CLIENT_ERROR
    logger.error({
      msg: 'Error due to missing query Parameters or request body',
      err: {responseCode: rspObj.responseCode},
      additionalInfo: { data }
    }, req)
    return response.status(400).send(respUtil.errorResponse(rspObj))
  }

  var ekStepReqData = {
    request: data.request
  }

  async.waterfall([

    function (CBW) {
      logger.debug({ msg: 'Request to update Framework Terms', additionalInfo: { data } }, req)
      ekStepUtil.frameworkTermUpdate(ekStepReqData, data.queryParams, data.category, req.headers, function (err, res) {
        if (err || res.responseCode !== responseCode.SUCCESS) {
          rspObj.responseCode = res && res.responseCode ? res.responseCode : responseCode.SERVER_ERROR
          logger.error({
            msg: 'Error while updating framework terms from ekstep',
            err: {
              err,
              responseCode: rspObj.responseCode
            },
            additionalInfo: {data}
          }, req)
          var httpStatus = res && res.statusCode >= 100 && res.statusCode < 600 ? res.statusCode : 500
          rspObj.result = res && res.result ? res.result : {}
          rspObj = utilsService.getErrorResponse(rspObj, res)
          return response.status(httpStatus).send(respUtil.errorResponse(rspObj))
        } else {
          CBW(null, res)
        }
      })
    },

    function (res) {
      rspObj.result = res.result
      return response.status(200).send(respUtil.successResponse(rspObj))
    }
  ])
}


function frameworkTermRetire(req, response) {
  var data = req.body;
  var rspObj = req.rspObj;
  data.queryParams = req.query;
  var failedContent = [];
  var userId = req.headers['x-authenticated-userid'];
  var errCode, errMsg, respCode, httpStatus;

  logger.debug({
    msg: 'frameworkTermService.frameworkTermRetire() called', additionalInfo: { rspObj }
  }, req);

  if (!data.request || !data.request.contentIds) {
    rspObj.errCode = contentMessage.RETIRE.MISSING_CODE;
    rspObj.errMsg = contentMessage.RETIRE.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    logger.error({
      msg: 'Error due to required request || request.contentIds are missing',
      err: {
        errCode: rspObj.errCode,
        errMsg: rspObj.errMsg,
        responseCode: rspObj.responseCode
      },
      additionalInfo: { data }
    }, req);
    return response.status(400).send(respUtil.errorResponse(rspObj));
  }

  async.each(data.request.contentIds, function (contentId, CBE) {
    logger.debug({
      msg: 'Request to retire the term',
      additionalInfo: { contentId: contentId }
    }, req);

    // Adding objectData in telemetry
    if (rspObj.telemetryData) {
      rspObj.telemetryData.object = utilsService.getObjectData(contentId, 'term', '', {});
    }

    ekStepUtil.frameworkTermRetire(contentId, req.headers, data.queryParams, function (err, res) {
      if (err || res.responseCode !== responseCode.SUCCESS) {
        errCode = res && res.params ? res.params.err : contentMessage.GET_MY.FAILED_CODE;
        errMsg = res && res.params ? res.params.errmsg : contentMessage.GET_MY.FAILED_MESSAGE;
        respCode = res && res.responseCode ? res.responseCode : responseCode.SERVER_ERROR;
        logger.error({
          msg: 'Getting error from framework term provider while retiring term',
          err: {
            err,
            errCode: rspObj.errCode,
            errMsg: rspObj.errMsg,
            responseCode: rspObj.responseCode
          },
          additionalInfo: { contentId }
        }, req);
        httpStatus = res && res.statusCode >= 100 && res.statusCode < 600 ? res.statusCode : 500;
        rspObj.result = res && res.result ? res.result : {};
        failedContent.push({ contentId: contentId, errCode: errCode, errMsg: errMsg });
      }
      CBE(null, null);
    });
  }, function () {
    if (failedContent.length > 0) {
      rspObj.errCode = errCode;
      rspObj.errMsg = errMsg;
      rspObj.responseCode = respCode;
      rspObj.result = failedContent;
      return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
    } else {
      rspObj.result = failedContent;
      logger.debug({ msg: 'Sending response back to user', res: rspObj }, req);
      return response.status(200).send(respUtil.successResponse(rspObj));
    }
  });
}

module.exports.getFrameworkTerm = getFrameworkTerm
module.exports.frameworkTermSearch = frameworkTermSearch
module.exports.frameworkTermCreate = frameworkTermCreate
module.exports.frameworkTermUpdate = frameworkTermUpdate
module.exports.frameworkTermRetire = frameworkTermRetire
