#ifndef Radar3DWINDOWWIDGETPLUGIN_H
#define Radar3DWINDOWWIDGETPLUGIN_H

#include <QWidget>
#include "com_plugins_Radar3D_Export.h"
#include "IWidgetPlugin.h"

class com_plugins_Radar3D_Export Radar3DWindowWidgetPlugin: public IWidgetPlugin
{
    Q_OBJECT

public:
    Radar3DWindowWidgetPlugin();
    virtual ~Radar3DWindowWidgetPlugin();

    /* Plugin interfaces */
    QList<ICenterWindow*> getCenterWindow();
    QList<ISettingWindow*> getSettingWindow();
    QList<IPluginInfo*> getPluginInfoWindow();
    
private:
    QList<ICenterWindow*> m_centerWindowList;
    QList<ISettingWindow*> m_settingWindowList;
    QList<IPluginInfo*> m_pluginInfoList;

    void createWidget();
};

#endif // WINDOWWIDGETPLUGIN_H
