#include "Radar3DWindowWidgetPlugin.h"
/* (TODO) Include user mainwondow GUI header */
#include <QTextCodec>


Radar3DWindowWidgetPlugin::Radar3DWindowWidgetPlugin(){

    QTextCodec::setCodecForTr(QTextCodec::codecForName("UTF-8"));
    QTextCodec::setCodecForLocale(QTextCodec::codecForName("UTF-8"));
    QTextCodec::setCodecForCStrings(QTextCodec::codecForName("UTF-8"));
    createWidget();
}

Radar3DWindowWidgetPlugin::~Radar3DWindowWidgetPlugin(){

}

void Radar3DWindowWidgetPlugin::createWidget(){
   
	/**
	* (TODO) Create user mainwindow GUI instance and append to list, e.g.:
	*  				ICenterWindow* formsatsearch = new FormSatSearch();
	*  				m_centerWindowList.append(formsatsearch);
	**/

}

QList<ICenterWindow*> Radar3DWindowWidgetPlugin::getCenterWindow(){

    return m_centerWindowList;
}

QList<ISettingWindow*> Radar3DWindowWidgetPlugin::getSettingWindow(){

    return m_settingWindowList;
}

QList<IPluginInfo*> Radar3DWindowWidgetPlugin::getPluginInfoWindow(){

    return m_pluginInfoList;
}
