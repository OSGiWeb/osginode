/*=============================================================================

  OSGi GUI Application Template

=============================================================================*/

#ifndef Radar3DWindowActivator_P_H
#define Radar3DWindowActivator_P_H

#include <QScopedPointer>

#include <ctkPluginActivator.h>

class Radar3DWindowWidgetPlugin;
class Radar3DWindowActivator : public QObject, public ctkPluginActivator
{
  Q_OBJECT
  Q_INTERFACES(ctkPluginActivator)

#ifdef HAVE_QT5
  Q_PLUGIN_METADATA(IID "com_plugins_Radar3D")
#endif

public:

  void start(ctkPluginContext* context);
  void stop(ctkPluginContext* context);

private:
  Radar3DWindowWidgetPlugin* m_windowWiget;

};

#endif // Radar3DWindowActivator_P_H
