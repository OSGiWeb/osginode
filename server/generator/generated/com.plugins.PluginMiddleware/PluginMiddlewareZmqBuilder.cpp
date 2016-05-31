#include <QDebug>
#include "ZmqObject.h"
#include "PluginMiddlewareZmqBuilder.h"
#include "ZmqManagement.h"
#include "ZmqDirector.h"
/* (TODO) Include user receive polling process header */

/////////////////////////////////////////////////////////////////////////////////
// Singleton Access
/////////////////////////////////////////////////////////////////////////////////
QSharedPointer<PluginMiddlewareZmqBuilder> PluginMiddlewareZmqBuilder::m_pPluginMiddlewareZmqBuilder;
PluginMiddlewareZmqBuilder* PluginMiddlewareZmqBuilder::GetInstance() {

    if(m_pPluginMiddlewareZmqBuilder.isNull()) {
        ZmqDirector m_directorPluginMiddleware;
        m_pPluginMiddlewareZmqBuilder = QSharedPointer<PluginMiddlewareZmqBuilder>(new PluginMiddlewareZmqBuilder());
        m_directorPluginMiddleware.Construct(*(m_pPluginMiddlewareZmqBuilder.data()));
    }
    return m_pPluginMiddlewareZmqBuilder.data();
}

PluginMiddlewareZmqBuilder::PluginMiddlewareZmqBuilder() {
    ZMQContext* context = ZmqManagement::GetInstance()->getZeroMQContext();
    m_pZmqObject = new ZmqObject(context);
}

PluginMiddlewareZmqBuilder::~PluginMiddlewareZmqBuilder() {

}

void PluginMiddlewareZmqBuilder::BuildSender() {
    m_pZmqObject->createSender(ZMQSocket::TYP_PUSH, "inproc://pushpull(ALL2CMW)", "RMD2CMW");
}

void PluginMiddlewareZmqBuilder::BuildReceiver() {
	/**
	* (TODO) Connect zmq to user polling receive process function, e.g.:
	*  		m_pZmqObject->createReceiver(ZMQSocket::TYP_SUB, "inproc://pubsub(CMW2ALL)", "CMW2RMD",
    *                     this, SLOT(processZmqMessage(const QList<QByteArray>&)));
	**/

}

void PluginMiddlewareZmqBuilder::BuildContext() {
    m_pZmqObject->startContext();
}

void PluginMiddlewareZmqBuilder::processZmqMessage(const QList<QByteArray>& msg) {
    qDebug()<<"[PluginMiddleware] received message from ZMQ socket!";

    QByteArray ba = msg.at(1); // Data in 2nd place
	
	/**
	* (TODO) Invoke user polling receive process function, e.g.:
	*  			NetDataProcess::getInstance()->processNetworkData(ba.data(), ba.length(), "CMW2RMD");
	**/
}
