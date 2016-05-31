#include "PluginMiddlewareWindowWidgetPlugin.h"
/* (TODO) Include user mainwondow GUI header */
#include <QTextCodec>


PluginMiddlewareWindowWidgetPlugin::PluginMiddlewareWindowWidgetPlugin(){

    QTextCodec::setCodecForTr(QTextCodec::codecForName("UTF-8"));
    QTextCodec::setCodecForLocale(QTextCodec::codecForName("UTF-8"));
    QTextCodec::setCodecForCStrings(QTextCodec::codecForName("UTF-8"));
    createWidget();
}

PluginMiddlewareWindowWidgetPlugin::~PluginMiddlewareWindowWidgetPlugin(){

}

void PluginMiddlewareWindowWidgetPlugin::createWidget(){
   
	/**
	* (TODO) Create user mainwindow GUI instance and append to list, e.g.:
	*  				ICenterWindow* formsatsearch = new FormSatSearch();
	*  				m_centerWindowList.append(formsatsearch);
	**/

}

QList<ICenterWindow*> PluginMiddlewareWindowWidgetPlugin::getCenterWindow(){

    return m_centerWindowList;
}

QList<ISettingWindow*> PluginMiddlewareWindowWidgetPlugin::getSettingWindow(){

    return m_settingWindowList;
}

QList<IPluginInfo*> PluginMiddlewareWindowWidgetPlugin::getPluginInfoWindow(){

    return m_pluginInfoList;
}
