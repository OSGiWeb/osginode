/*=============================================================================

  OSGi GUI Application Template

=============================================================================*/

#ifndef PluginMiddlewareWindowActivator_P_H
#define PluginMiddlewareWindowActivator_P_H

#include <QScopedPointer>

#include <ctkPluginActivator.h>

class PluginMiddlewareWindowWidgetPlugin;
class PluginMiddlewareWindowActivator : public QObject, public ctkPluginActivator
{
  Q_OBJECT
  Q_INTERFACES(ctkPluginActivator)

#ifdef HAVE_QT5
  Q_PLUGIN_METADATA(IID "com_plugins_PluginMiddleware")
#endif

public:

  void start(ctkPluginContext* context);
  void stop(ctkPluginContext* context);

private:
  PluginMiddlewareWindowWidgetPlugin* m_windowWiget;

};

#endif // PluginMiddlewareWindowActivator_P_H
