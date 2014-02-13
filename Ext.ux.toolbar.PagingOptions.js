/**
 * @class Ext.ux.toolbar.PagingOptions
 * @author Arthur Kay (http://www.akawebdesign.com)
 * @namespace Ext.ux.toolbar
 * @version 1.0
 * @extends Ext.toolbar.Paging
 * @constructor
 * @param {object} configObj
 *
 *
 * GitHub Project: https://github.com/arthurakay/Ext.ux.toolbar.PagingOptions/
 *
 * The MIT License (MIT)
 *
 * Copyright (c) <2011> Arthur Kay
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Ext.define('Ext.ux.toolbar.PagingOptions', {
    extend : 'Ext.toolbar.Paging',

    getPagingItems : function() {
        var me = this,
            pagingButtons = me.callParent();

        if (!Ext.ModelManager.getModel('PageSize')) {
            Ext.define('PageSize', {
                extend : 'Ext.data.Model',
                fields : [{ name : 'pagesize' , type : 'int'}]
            });
        }

        if (!me.pageSizeOptions) {
            me.pageSizeOptions = [
                { pagesize : 10 },
                { pagesize : 25 },
                { pagesize : 50 },
                { pagesize : 100 },
                { pagesize : 250 },
                { pagesize : 500 }
            ];
        }

        pagingButtons.push({
            xtype           : 'combobox',
            queryMode       : 'local',
            triggerAction   : 'all',
            displayField    : 'pagesize',
            valueField      : 'pagesize',
            width           : 100,
            lazyRender      : true,
            enableKeyEvents : true,
            value           : me.pageSize,
            forceSelection  : me.forceSelection || false,

            store : new Ext.data.Store({
                model : 'PageSize',
                data  : me.pageSizeOptions
            }),

            listeners : {
                select : function(thisField, value) {
                    me.fireEvent('pagesizeselect', value[0].get('pagesize'));
                },
                keypress : function(thisField, eventObj) {
                    if (eventObj.getKey() !== eventObj.ENTER) { return false; }
                    me.fireEvent('pagesizeselect', thisField.getValue());
                }
            }
        });

        return pagingButtons;
    },

    initComponent : function() {
        var me = this;

        me.callParent();

        me.addEvents(
            'pagesizeselect'
        );
    }
});
