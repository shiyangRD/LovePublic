/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
    config.language = 'zh-cn';
    config.toolbar = 'Basic';
    config.toolbar_Basic = [
        ['Bold', 'Italic', 'Underline', 'FontSize', 'Image', 'Flash', 'Smiley'],
        ['TextColor', 'BGColor'],
        ['Strike', 'RemoveFormat']
    ];
	// config.uiColor = '#AADC6E';
    config.height = 360;
    config.width = 686;
    config.resize_enabled = false;
    };
