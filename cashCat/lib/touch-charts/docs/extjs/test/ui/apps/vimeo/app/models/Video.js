/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Video
 * @extends Ext.data.Model
 * The Video model
 */
Ext.regModel("Video", {
    fields: [
        {name: "id",                       type: "int"},
        {name: "title",                    type: "string"},
        {name: "title",                    type: "string"},
        {name: "description",              type: "string"},
        {name: "url",                      type: "string"},
        {name: "upload_date",              type: "date"},
        {name: "mobile_url",               type: "string"},
        {name: "thumbnail_small",          type: "string"},
        {name: "thumbnail_medium",         type: "string"},
        {name: "thumbnail_large",          type: "string"},
        {name: "user_name",                type: "string"},
        {name: "user_url",                 type: "string"},
        {name: "user_portrait_small",      type: "string"},
        {name: "user_portrait_medium",     type: "string"},
        {name: "user_portrait_large",      type: "string"},
        {name: "user_portrait_huge",       type: "string"},
        {name: "stats_number_of_likes",    type: "int"},
        {name: "stats_number_of_plays",    type: "int"},
        {name: "stats_number_of_comments", type: "int"},
        {name: "duration",                 type: "int"},
        {name: "width",                    type: "int"},
        {name: "height",                   type: "int"},
        {name: "tags",                     type: "string"}
    ]
});

