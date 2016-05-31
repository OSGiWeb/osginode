#ifndef PluginMiddlewareWINDOWWIDGETPLUGIN_H
#define PluginMiddlewareWINDOWWIDGETPLUGIN_H

#include <QWidget>
#include "com_plugins_PluginMiddleware_Export.h"
#include "IWidgetPlugin.h"

class com_plugins_PluginMiddleware_Export PluginMiddlewareWindowWidgetPlugin: public IWidgetPlugin
{
    Q_OBJECT

public:
    PluginMiddlewareWindowWidgetPlugin();
    virtual ~PluginMiddlewareWindowWidgetPlugin();

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
