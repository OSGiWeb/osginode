#include <QDebug>
#include "ZmqObject.h"
#include "Radar3DZmqBuilder.h"
#include "ZmqManagement.h"
#include "ZmqDirector.h"
/* (TODO) Include user receive polling process header */

/////////////////////////////////////////////////////////////////////////////////
// Singleton Access
/////////////////////////////////////////////////////////////////////////////////
QSharedPointer<Radar3DZmqBuilder> Radar3DZmqBuilder::m_pRadar3DZmqBuilder;
Radar3DZmqBuilder* Radar3DZmqBuilder::GetInstance() {

    if(m_pRadar3DZmqBuilder.isNull()) {
        ZmqDirector m_directorRadar3D;
        m_pRadar3DZmqBuilder = QSharedPointer<Radar3DZmqBuilder>(new Radar3DZmqBuilder());
        m_directorRadar3D.Construct(*(m_pRadar3DZmqBuilder.data()));
    }
    return m_pRadar3DZmqBuilder.data();
}

Radar3DZmqBuilder::Radar3DZmqBuilder() {
    ZMQContext* context = ZmqManagement::GetInstance()->getZeroMQContext();
    m_pZmqObject = new ZmqObject(context);
}

Radar3DZmqBuilder::~Radar3DZmqBuilder() {

}

void Radar3DZmqBuilder::BuildSender() {
    m_pZmqObject->createSender(ZMQSocket::TYP_PUSH, "inproc://pushpull(ALL2CMW)", "RMD2CMW");
}

void Radar3DZmqBuilder::BuildReceiver() {
	/**
	* (TODO) Connect zmq to user polling receive process function, e.g.:
	*  		m_pZmqObject->createReceiver(ZMQSocket::TYP_SUB, "inproc://pubsub(CMW2ALL)", "CMW2RMD",
    *                     this, SLOT(processZmqMessage(const QList<QByteArray>&)));
	**/

}

void Radar3DZmqBuilder::BuildContext() {
    m_pZmqObject->startContext();
}

void Radar3DZmqBuilder::processZmqMessage(const QList<QByteArray>& msg) {
    qDebug()<<"[Radar3D] received message from ZMQ socket!";

    QByteArray ba = msg.at(1); // Data in 2nd place
	
	/**
	* (TODO) Invoke user polling receive process function, e.g.:
	*  			NetDataProcess::getInstance()->processNetworkData(ba.data(), ba.length(), "CMW2RMD");
	**/
}
