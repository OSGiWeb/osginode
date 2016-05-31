/*=============================================================================

  OSGi GUI Application Template

=============================================================================*/
#include <QDebug>
#include <QtPlugin>
#include <ctkPluginContext.h>

#include "Radar3DWindowActivator.h"
#include "gui/Radar3DWindowWidgetPlugin.h"

//----------------------------------------------------------------------------
void Radar3DWindowActivator::start(ctkPluginContext* context)
{
  m_windowWiget = new Radar3DWindowWidgetPlugin();


  ctkDictionary props;
  props.insert(ctkPluginConstants::SERVICE_RANKING, 0);

  context->registerService(QStringList("IWidgetPlugin"),    // service-> class name: IWidgetPlugin
                           m_windowWiget, props);

  qDebug() << "Registered Radar3DWindow UI Plugin";
  qDebug("size=====%d", m_windowWiget->getCenterWindow().size());
  qDebug("title = %s",qPrintable((m_windowWiget->getCenterWindow()).at(0)->getTitle()));
}

//----------------------------------------------------------------------------
void Radar3DWindowActivator::stop(ctkPluginContext* context)
{
  Q_UNUSED(context)
  delete m_windowWiget;
}

#if QT_VERSION < QT_VERSION_CHECK(5,0,0)
  Q_EXPORT_PLUGIN2(com_plugins_Radar3DWindow, Radar3DWindowActivator)
#endif
